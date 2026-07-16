# AI Job Market Intelligence

![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)
![License](https://img.shields.io/badge/License-MIT-blue)

Advanced AI job market analytics platform with skill demand forecasting, job aggregation, a South Africa tech heatmap, and an Data-driven resume matcher.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  React Frontend │────▶│  FastAPI Backend  │────▶│  SQLite / PGSQL  │
│  (Vite + React) │     │  (REST API)       │     │  (Jobs + Trends) │
└─────────────────┘     └──────────────────┘     └──────────────────┘
```

## Features

### Frontend (`frontend/`)

Built with React 19, Vite, Tailwind CSS v4, Recharts, and Framer Motion.

- **Intelligence Dashboard** — Area chart of job posting trends, bar chart of top required skills, AI market insight feed, and stat cards (active jobs, talent pool, average salary, urgent postings)
- **Job Aggregator** — Browse job listings with category filters (All, Development, Design, Marketing, Sales) and skill tags
- **SA Tech Heatmap** — City-by-city overview of tech skill concentration across Johannesburg, Cape Town, Durban, Pretoria, and Gqeberha
- **AI Resume Matcher** — Upload a resume to get a match score, skill matches, identified gaps, and recommended career paths

### Backend (`backend/`)

Built with FastAPI + SQLAlchemy + SQLite.

| Endpoint | Method | Description |
|---|---|---|
| `/api/jobs` | GET | List job listings (paginated) |
| `/api/trends` | GET | Skill demand scores and growth rates |
| `/api/match-resume` | POST | Accepts `resume_text`, returns mock match score, matches, and gaps |
| `/api/health` | GET | Health check |

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python seed.py          # Seed sample data
uvicorn main:app --reload
```

API runs at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and connects to the backend API.

## API Demo

A static landing page (`index.html`) also showcases the system architecture and branding.

## Screenshots

![Dashboard](./screenshots/)

## License

MIT — see [LICENSE](./LICENSE).

