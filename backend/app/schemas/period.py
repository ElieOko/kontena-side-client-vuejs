from dataclasses import dataclass
from datetime import date, datetime, time, timezone

from fastapi import HTTPException, Query, status


@dataclass(frozen=True)
class PeriodFilter:
    date_from: date | None
    date_to: date | None

    @property
    def start_datetime(self) -> datetime | None:
        if self.date_from is None:
            return None
        return datetime.combine(self.date_from, time.min, tzinfo=timezone.utc)

    @property
    def end_datetime(self) -> datetime | None:
        if self.date_to is None:
            return None
        return datetime.combine(self.date_to, time.max, tzinfo=timezone.utc)

    @property
    def is_active(self) -> bool:
        return self.date_from is not None or self.date_to is not None

    def to_response(self) -> dict[str, date | None]:
        return {"date_from": self.date_from, "date_to": self.date_to}


def get_period_filter(
    date_from: date | None = Query(None, description="Date de début (inclusive), format YYYY-MM-DD"),
    date_to: date | None = Query(None, description="Date de fin (inclusive), format YYYY-MM-DD"),
) -> PeriodFilter:
    period = PeriodFilter(date_from=date_from, date_to=date_to)
    if (
        period.start_datetime is not None
        and period.end_datetime is not None
        and period.start_datetime > period.end_datetime
    ):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="date_from doit être antérieure ou égale à date_to",
        )
    return period
