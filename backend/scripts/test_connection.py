"""Script CLI pour tester la connexion à la base de données."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.database import test_connection


def main() -> None:
    result = test_connection()

    print("=== Test de connexion PostgreSQL ===")
    print(f"Host     : {result['host']}")
    print(f"Database : {result['database']}")
    print(f"User     : {result['user']}")
    print(f"Status   : {'OK' if result['success'] else 'ERREUR'}")
    print(f"Message  : {result['message']}")

    if result["success"]:
        print(f"Version  : {result['version']}")
    else:
        print(f"Détail   : {result['error']}")


if __name__ == "__main__":
    main()
