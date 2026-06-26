from datetime import date, datetime

from pydantic import BaseModel


class StatItem(BaseModel):
    label: str
    count: int


class StatsPeriod(BaseModel):
    date_from: date | None = None
    date_to: date | None = None


class UsersStats(BaseModel):
    total_unique_users: int
    period: StatsPeriod | None = None


class GenderStats(BaseModel):
    total: int
    items: list[StatItem]
    period: StatsPeriod | None = None


class ThemeStats(BaseModel):
    total: int
    items: list[StatItem]
    period: StatsPeriod | None = None


class DashboardStats(BaseModel):
    users: UsersStats
    gender: GenderStats
    themes: ThemeStats


class GrowthPoint(BaseModel):
    label: str
    new_users: int
    cumulative_users: int


class UserGrowthStats(BaseModel):
    granularity: str
    items: list[GrowthPoint]


class TopThemePeriod(BaseModel):
    period: str
    period_label: str
    theme: str
    count: int


class TopThemesByPeriod(BaseModel):
    items: list[TopThemePeriod]


class PlatformUser(BaseModel):
    phone_number: str
    gender: str
    first_seen: datetime | None = None
    last_seen: datetime | None = None
    messages_count: int = 0


class PlatformUsersList(BaseModel):
    total: int
    items: list[PlatformUser]
