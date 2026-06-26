from collections.abc import Generator

from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.config import settings

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    connect_args={"sslmode": "require"},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def test_connection() -> dict[str, str | bool]:
    """Teste la connexion PostgreSQL et retourne le résultat."""
    try:
        with engine.connect() as connection:
            version = connection.execute(text("SELECT version()")).scalar()
        return {
            "success": True,
            "message": "Connexion réussie",
            "host": settings.database_host,
            "database": settings.database_name,
            "user": settings.database_user,
            "version": str(version),
        }
    except SQLAlchemyError as exc:
        return {
            "success": False,
            "message": "Échec de la connexion",
            "host": settings.database_host,
            "database": settings.database_name,
            "user": settings.database_user,
            "error": str(exc),
        }


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
