.PHONY: backend-dev backend-lint frontend-dev frontend-build install seed

install:
	cd backend && pip install -r requirements.txt
	cd frontend && npm install

seed:
	cd backend && python seed.py

backend-dev:
	cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000

backend-lint:
	cd backend && ruff check . 2>/dev/null || flake8 . 2>/dev/null || true

frontend-dev:
	cd frontend && npm run dev

frontend-build:
	cd frontend && npm run build

dev:
	@echo "Run 'make backend-dev' and 'make frontend-dev' in separate terminals"
