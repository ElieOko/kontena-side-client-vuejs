from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Chat(Base):
  __tablename__ = "chat"

  id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
  session_id: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
  sexe: Mapped[str | None] = mapped_column("Sexe", String(50), nullable=True)
  message_category: Mapped[str | None] = mapped_column(String(255), nullable=True)
  message: Mapped[str | None] = mapped_column(Text, nullable=True)
  time: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
