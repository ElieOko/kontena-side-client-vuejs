# Backend Dashboard Chat (FastAPI)

API FastAPI pour le dashboard des statistiques du chat Supabase.

## Installation

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Configurer `backend/.env` avec les identifiants Supabase.

## Initialisation

```bash
python scripts/seed_admin.py
```

Compte admin par défaut : `admin` / `admin123`

## Lancement

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/v1/dashboard/auth/login` | Connexion admin |
| GET | `/api/v1/dashboard/stats` | Toutes les statistiques (`?date_from=&date_to=`) |
| GET | `/api/v1/dashboard/stats/users/list` | Liste des utilisateurs (téléphone, genre) |
| GET | `/api/v1/dashboard/stats/gender` | Répartition par `sexe` |
| GET | `/api/v1/dashboard/stats/themes` | Thèmes `message_category` par période |
| GET | `/api/v1/dashboard/stats/users/growth` | Croissance utilisateurs (`granularity=day\|week\|month`) |
| GET | `/api/v1/dashboard/stats/themes/top-by-period` | Thème le plus consulté (jour / semaine / mois) |

### Filtrage par période

Les endpoints de statistiques acceptent des paramètres optionnels :

- `date_from` : date de début inclusive (`YYYY-MM-DD`)
- `date_to` : date de fin inclusive (`YYYY-MM-DD`)

Exemple : `/api/v1/dashboard/stats/themes?date_from=2026-05-21&date_to=2026-06-01`

## Tables

- `chat` (existante) : `session_id`, `Sexe`, `message_category`, `time`
- `dashboard_roles` : rôles (`admin`, `viewer`)
- `dashboard_users` : comptes administrateurs
