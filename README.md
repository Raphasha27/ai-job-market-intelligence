# AI Job Market Intelligence Platform (Advanced)

A sophisticated platform for aggregating job postings, analyzing skill trends, and providing career recommendations using AI.

## Features
- **Job Aggregation**: Scraping/Connecting to job boards.
- **Skill Analysis**: Trend analysis for in-demand skills.
- **Career Pathways**: Personalized AI-driven career recommendations.
- **SA Tech Heatmap**: Visualization of tech skills across South Africa.
- **Resume Matching**: Matching resumes to the most relevant job postings.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Recharts, Framer Motion
- **Backend**: FastAPI (Python), SQLAlchemy
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **AI**: OpenAI API (Mocked in demo)

## Getting Started

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Seed the database (optional):
   ```bash
   python seed.py
   ```
4. Run the API:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.
