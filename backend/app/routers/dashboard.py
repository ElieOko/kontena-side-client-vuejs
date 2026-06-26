from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.auth.security import create_access_token, hash_password, verify_password
from app.database import get_db
from app.deps import require_admin, require_superadmin
from app.models import Role, User
from app.schemas.auth import (
    AdminUserCreate,
    AdminUserUpdate,
    AdminUsersList,
    LoginRequest,
    TokenResponse,
    UserRead,
)
from app.schemas.period import PeriodFilter, get_period_filter
from app.schemas.stats import (
    DashboardStats,
    GenderStats,
    PlatformUsersList,
    ThemeStats,
    TopThemesByPeriod,
    UserGrowthStats,
    UsersStats,
)
from app.services.stats import (
    get_dashboard_stats,
    get_gender_stats,
    get_platform_users,
    get_theme_stats,
    get_top_themes_by_period,
    get_user_growth_stats,
    get_users_stats,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = (
        db.query(User)
        .options(joinedload(User.role))
        .filter(User.username == payload.username, User.is_active.is_(True))
        .first()
    )
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Identifiants invalides")

    token = create_access_token(user.username)
    return TokenResponse(access_token=token, user=UserRead.model_validate(user))


@router.get("/stats", response_model=DashboardStats)
def read_all_stats(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
    period: PeriodFilter = Depends(get_period_filter),
) -> DashboardStats:
    return get_dashboard_stats(db, period)


@router.get("/stats/users", response_model=UsersStats)
def read_users_stats(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
    period: PeriodFilter = Depends(get_period_filter),
) -> UsersStats:
    return get_users_stats(db, period)


@router.get("/stats/users/list", response_model=PlatformUsersList)
def read_platform_users(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
    period: PeriodFilter = Depends(get_period_filter),
) -> PlatformUsersList:
    return get_platform_users(db, period)


@router.get("/stats/gender", response_model=GenderStats)
def read_gender_stats(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
    period: PeriodFilter = Depends(get_period_filter),
) -> GenderStats:
    return get_gender_stats(db, period)


@router.get("/stats/themes", response_model=ThemeStats)
def read_theme_stats(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
    period: PeriodFilter = Depends(get_period_filter),
) -> ThemeStats:
    return get_theme_stats(db, period)


@router.get("/stats/users/growth", response_model=UserGrowthStats)
def read_user_growth_stats(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
    granularity: str = Query("day", pattern="^(day|week|month)$"),
    period: PeriodFilter = Depends(get_period_filter),
) -> UserGrowthStats:
    return get_user_growth_stats(db, granularity, period)


@router.get("/stats/themes/top-by-period", response_model=TopThemesByPeriod)
def read_top_themes_by_period(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> TopThemesByPeriod:
    return get_top_themes_by_period(db)


@router.get("/admin-users", response_model=AdminUsersList)
def list_admin_users(
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
) -> AdminUsersList:
    users = (
        db.query(User)
        .options(joinedload(User.role))
        .order_by(User.created_at.desc())
        .all()
    )
    return AdminUsersList(total=len(users), items=[UserRead.model_validate(user) for user in users])


@router.post("/admin-users", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_admin_user(
    payload: AdminUserCreate,
    _: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
) -> UserRead:
    username = payload.username.strip()
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Ce nom d'utilisateur existe déjà")

    if payload.email and db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Cet e-mail est déjà utilisé")

    role = db.query(Role).filter(Role.name == payload.role).first()
    if not role:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Rôle invalide")

    user = User(
        username=username,
        email=payload.email,
        hashed_password=hash_password(payload.password),
        role_id=role.id,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    user = (
        db.query(User)
        .options(joinedload(User.role))
        .filter(User.id == user.id)
        .first()
    )
    return UserRead.model_validate(user)


@router.patch("/admin-users/{user_id}", response_model=UserRead)
def update_admin_user(
    user_id: int,
    payload: AdminUserUpdate,
    current_user: User = Depends(require_superadmin),
    db: Session = Depends(get_db),
) -> UserRead:
    user = (
        db.query(User)
        .options(joinedload(User.role))
        .filter(User.id == user_id)
        .first()
    )
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Utilisateur introuvable")

    if payload.is_active is False and user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vous ne pouvez pas désactiver votre propre compte",
        )

    if payload.is_active is False and user.role.name == "superadmin":
        active_superadmins = (
            db.query(User)
            .join(Role)
            .filter(Role.name == "superadmin", User.is_active.is_(True), User.id != user.id)
            .count()
        )
        if active_superadmins == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Impossible de désactiver le dernier super administrateur actif",
            )

    if payload.email is not None:
        email = payload.email.strip() or None
        if email and db.query(User).filter(User.email == email, User.id != user.id).first():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Cet e-mail est déjà utilisé")
        user.email = email

    if payload.password:
        user.hashed_password = hash_password(payload.password)

    if payload.is_active is not None:
        user.is_active = payload.is_active

    db.commit()
    db.refresh(user)
    user = (
        db.query(User)
        .options(joinedload(User.role))
        .filter(User.id == user.id)
        .first()
    )
    return UserRead.model_validate(user)
