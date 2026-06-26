"""Initialise les tables dashboard et crée un compte admin par défaut."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy.orm import Session

from app.auth.security import hash_password
from app.database import Base, SessionLocal, engine
from app.models import Role, User


def seed() -> None:
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        superadmin_role = db.query(Role).filter(Role.name == "superadmin").first()
        if not superadmin_role:
            superadmin_role = Role(name="superadmin")
            db.add(superadmin_role)
            db.flush()

        admin_role = db.query(Role).filter(Role.name == "admin").first()
        if not admin_role:
            admin_role = Role(name="admin")
            db.add(admin_role)
            db.flush()

        viewer_role = db.query(Role).filter(Role.name == "viewer").first()
        if not viewer_role:
            db.add(Role(name="viewer"))

        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            db.add(
                User(
                    username="admin",
                    email="admin@kontena.local",
                    hashed_password=hash_password("admin123"),
                    role_id=superadmin_role.id,
                    is_active=True,
                )
            )
        elif admin_user.role.name == "admin":
            admin_user.role_id = superadmin_role.id

        db.commit()
        print("Tables dashboard initialisées. Compte superadmin: admin / admin123")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
