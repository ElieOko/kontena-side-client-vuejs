from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload

from app.auth.security import create_access_token, verify_password
from app.database import get_db
from app.deps import require_admin
from app.models import User
from app.schemas.auth import LoginRequest, TokenResponse, UserRead
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
