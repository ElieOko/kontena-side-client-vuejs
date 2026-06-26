from datetime import UTC, datetime, time, timedelta

from sqlalchemy import func, text
from sqlalchemy.orm import Query, Session

from app.models import Chat
from app.schemas.period import PeriodFilter
from app.schemas.stats import (
    DashboardStats,
    GenderStats,
    GrowthPoint,
    PlatformUser,
    PlatformUsersList,
    StatItem,
    StatsPeriod,
    ThemeStats,
    TopThemePeriod,
    TopThemesByPeriod,
    UserGrowthStats,
    UsersStats,
)

THEME_CATEGORIES = [
    "Referencement",
    "Cycle menstruel",
    "VBG (Violences Basées sur le Genre)",
    "Contraception",
]

GENDER_LABELS = {
    "femme": "Femme",
    "féminin": "Femme",
    "feminin": "Femme",
    "f": "Femme",
    "female": "Femme",
    "homme": "Homme",
    "masculin": "Homme",
    "h": "Homme",
    "male": "Homme",
}


def _period_response(period: PeriodFilter) -> StatsPeriod | None:
    if not period.is_active:
        return None
    return StatsPeriod(**period.to_response())


def _apply_period_filter(query: Query, period: PeriodFilter) -> Query:
    if period.start_datetime is not None:
        query = query.filter(Chat.time >= period.start_datetime)
    if period.end_datetime is not None:
        query = query.filter(Chat.time <= period.end_datetime)
    return query


def _normalize_gender(value: str | None) -> str:
    if not value:
        return "Non renseigné"
    normalized = value.strip().lower()
    return GENDER_LABELS.get(normalized, value.strip().title())


def _normalize_theme(value: str | None) -> str:
    if not value:
        return "Non catégorisé"
    cleaned = value.strip()
    for category in THEME_CATEGORIES:
        if cleaned.lower() == category.lower():
            return category
    return cleaned


def _sessions_query(db: Session, period: PeriodFilter | None = None) -> Query:
    query = (
        db.query(
            Chat.session_id,
            func.min(Chat.time).label("first_seen"),
            func.max(Chat.time).label("last_seen"),
            func.count(Chat.id).label("messages_count"),
        )
        .filter(Chat.session_id.isnot(None))
    )
    if period and period.is_active:
        query = _apply_period_filter(query, period)
    return query.group_by(Chat.session_id)


def _gender_map_for_sessions(db: Session, session_ids: list[str]) -> dict[str, str]:
    if not session_ids:
        return {}

    rows = db.execute(
        text(
            """
            SELECT DISTINCT ON (session_id) session_id::text, "Sexe"
            FROM chat
            WHERE session_id::text = ANY(:ids)
            ORDER BY session_id, ("Sexe" IS NULL), time DESC NULLS LAST
            """
        ),
        {"ids": session_ids},
    ).fetchall()

    return {session_id: _normalize_gender(sexe) for session_id, sexe in rows}


def get_platform_users(db: Session, period: PeriodFilter | None = None) -> PlatformUsersList:
    period = period or PeriodFilter(date_from=None, date_to=None)
    rows = _sessions_query(db, period).order_by(func.max(Chat.time).desc()).all()
    session_ids = [str(row.session_id) for row in rows]
    gender_by_session = _gender_map_for_sessions(db, session_ids)

    items = [
        PlatformUser(
            phone_number=str(row.session_id),
            gender=gender_by_session.get(str(row.session_id), "Non renseigné"),
            first_seen=row.first_seen,
            last_seen=row.last_seen,
            messages_count=row.messages_count or 0,
        )
        for row in rows
    ]

    return PlatformUsersList(total=len(items), items=items)


def get_users_stats(db: Session, period: PeriodFilter | None = None) -> UsersStats:
    period = period or PeriodFilter(date_from=None, date_to=None)
    users = get_platform_users(db, period)
    return UsersStats(total_unique_users=users.total, period=_period_response(period))


def get_gender_stats(db: Session, period: PeriodFilter | None = None) -> GenderStats:
    period = period or PeriodFilter(date_from=None, date_to=None)
    users = get_platform_users(db, period)
    counts: dict[str, int] = {}
    for user in users.items:
        counts[user.gender] = counts.get(user.gender, 0) + 1

    order = ["Femme", "Homme", "Non renseigné"]
    items = [StatItem(label=label, count=counts[label]) for label in order if counts.get(label)]
    for label, count in sorted(counts.items()):
        if label not in order:
            items.append(StatItem(label=label, count=count))

    total = sum(item.count for item in items)
    return GenderStats(total=total, items=items, period=_period_response(period))


def get_theme_stats(db: Session, period: PeriodFilter | None = None) -> ThemeStats:
    period = period or PeriodFilter(date_from=None, date_to=None)
    query = db.query(Chat.message_category, func.count(Chat.id))
    if period.is_active:
        query = _apply_period_filter(query, period)

    rows = query.group_by(Chat.message_category).all()
    counts_by_theme: dict[str, int] = {category: 0 for category in THEME_CATEGORIES}
    other_total = 0

    for category, count in rows:
        normalized = _normalize_theme(category)
        if normalized in counts_by_theme:
            counts_by_theme[normalized] += count
        else:
            other_total += count

    items = [StatItem(label=category, count=counts_by_theme[category]) for category in THEME_CATEGORIES]
    if other_total:
        items.append(StatItem(label="Autres", count=other_total))

    total = sum(item.count for item in items)
    return ThemeStats(total=total, items=items, period=_period_response(period))


def get_dashboard_stats(db: Session, period: PeriodFilter | None = None) -> DashboardStats:
    period = period or PeriodFilter(date_from=None, date_to=None)
    return DashboardStats(
        users=get_users_stats(db, period),
        gender=get_gender_stats(db, period),
        themes=get_theme_stats(db, period),
    )


def _format_growth_label(value: datetime, granularity: str) -> str:
    if granularity == "month":
        return value.strftime("%Y-%m")
    if granularity == "week":
        return value.strftime("%Y-%m-%d")
    return value.strftime("%Y-%m-%d")


def get_user_growth_stats(
    db: Session,
    granularity: str = "day",
    period: PeriodFilter | None = None,
) -> UserGrowthStats:
    period = period or PeriodFilter(date_from=None, date_to=None)
    if granularity == "week":
        period_expr = func.date_trunc("week", Chat.time)
    elif granularity == "month":
        period_expr = func.date_trunc("month", Chat.time)
    else:
        period_expr = func.date(Chat.time)

    query = (
        db.query(period_expr, func.count(func.distinct(Chat.session_id)))
        .filter(Chat.session_id.isnot(None), Chat.time.isnot(None))
    )
    if period.is_active:
        query = _apply_period_filter(query, period)

    rows = query.group_by(period_expr).order_by(period_expr).all()

    cumulative = 0
    items: list[GrowthPoint] = []
    for period_value, count in rows:
        if period_value is None:
            continue
        if isinstance(period_value, datetime):
            label_dt = period_value
        else:
            label_dt = datetime.combine(period_value, time.min, tzinfo=UTC)
        cumulative += count
        items.append(
            GrowthPoint(
                label=_format_growth_label(label_dt, granularity),
                new_users=count,
                cumulative_users=cumulative,
            )
        )

    return UserGrowthStats(granularity=granularity, items=items)


def _top_theme_in_range(db: Session, start: datetime, end: datetime) -> tuple[str, int]:
    rows = (
        db.query(Chat.message_category, func.count(Chat.id))
        .filter(Chat.time.isnot(None), Chat.time >= start, Chat.time <= end)
        .group_by(Chat.message_category)
        .order_by(func.count(Chat.id).desc())
        .all()
    )

    if not rows:
        return "Aucune donnée", 0

    best_category, best_count = rows[0]
    return _normalize_theme(best_category), best_count


def get_top_themes_by_period(db: Session) -> TopThemesByPeriod:
    now = datetime.now(UTC)
    today_start = datetime.combine(now.date(), time.min, tzinfo=UTC)
    week_start = now - timedelta(days=7)
    month_start = datetime(now.year, now.month, 1, tzinfo=UTC)

    periods = [
        ("day", "Aujourd'hui", today_start, now),
        ("week", "7 derniers jours", week_start, now),
        ("month", "Ce mois", month_start, now),
    ]

    items = [
        TopThemePeriod(
            period=period_key,
            period_label=period_label,
            theme=theme,
            count=count,
        )
        for period_key, period_label, start, end in periods
        for theme, count in [_top_theme_in_range(db, start, end)]
    ]

    return TopThemesByPeriod(items=items)
