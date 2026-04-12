# Project Intelligence — AI HR Platform

## 1. Full-Stack Overview
This project is a **full-stack internal AI HR dashboard** with a **React (Vite) frontend**, a **FastAPI backend**, and a **PostgreSQL database** accessed via **SQLAlchemy (async)**. The relationship is:

- **Frontend (React)** renders module pages (Hiring + HR ops modules) and calls backend APIs via a shared `services` layer (`fetch` wrapper).
- **Backend (FastAPI)** exposes REST APIs under `/api/v1/...` and handles business logic in **service** layers with **repository** layers handling DB access.
- **Database (PostgreSQL)** persists HR entities (users, roles, jobs, candidates, assignments, interviews, offers, statuses, stages, notifications). Business values like statuses/stages/roles are **DB-driven**, not hardcoded in backend logic.

Primary flow: **UI → API (`/api/v1/hiring/...`) → service → repository → PostgreSQL**.

## 2. Directory Map
**Root**: `/Users/rupayan/ai-hr-platform`

- `/Users/rupayan/ai-hr-platform/CodeBaseDetails`
  - Documentation and LLM reference files (this file is the source of truth).
- `/Users/rupayan/ai-hr-platform/backend`
  - FastAPI application and DB scripts.
  - `app/` — core backend code.
  - `db/` — schema + seed SQL.
  - `venv/` — local Python environment (not part of app logic).
- `/Users/rupayan/ai-hr-platform/frontend`
  - Vite + React app.
  - `src/` — UI modules, layout, services, configs.
  - `package.json` — frontend deps/scripts.

## 3. Data Flow (UI → API → DB)
1. **User action** in a page (e.g., Candidates page filtering).
2. **Frontend service** calls backend via `/api/v1/hiring/<module>` using `fetch` wrapper (`frontend/src/services/api.js`).
3. **FastAPI router** receives request and validates with **Pydantic schemas**.
4. **Service layer** applies business logic (e.g., filtering, validation, orchestration).
5. **Repository layer** executes SQLAlchemy async queries.
6. **Database** persists or retrieves records.
7. Response is normalized with **`APIResponse` / `ListResponse`** schemas.
8. Frontend updates local state and re-renders.

## 4. Logic Modules
### Backend Modules
All modules follow `router.py` → `service.py` → `repository.py` → `schema.py`.

**Hiring (parent module)**: `/backend/app/modules/hiring/`
- `dashboard/` — placeholder endpoints (future analytics).
- `jobs/` — list endpoint implemented, placeholder for full CRUD.
- `candidates/` — fully implemented CRUD + pagination + filters.
- `assignments/` — placeholder endpoints.
- `interviews/` — placeholder endpoints.
- `offers/` — placeholder endpoints.
- `settings/` — lists stages, jobs, statuses (DB-driven settings).

**Other Modules**:
- `/attendance/` — placeholder endpoints.
- `/payroll/` — placeholder endpoints.
- `/performance/` — placeholder endpoints.
- `/leave/` — placeholder endpoints.
- `/onboarding/` — placeholder endpoints.

**Cross-cutting utilities**:
- `app/utils/ai.py` — async AI placeholders (JD generator, assignment evaluator, interview analyzer) with retry logic.
- `app/utils/ws.py` — WebSocket connection manager for notifications.
- `app/schemas/response.py` — response envelopes for consistent API responses.

### Frontend Modules
Feature-based structure mirrors backend:

`/frontend/src/modules/hiring/`
- `dashboard/` — Figma-style dashboard UI.
- `jobs/` — Figma-style job postings UI (config-driven mock content).
- `candidates/` — working module with filtering, list, and create.
- `assignments/`, `interviews/`, `offers/`, `settings/` — placeholder pages.

Other modules under `/frontend/src/modules/`:
- `attendance/`, `payroll/`, `performance/`, `leave/`, `onboarding/` — placeholder pages.

**Shared UI**:
- `components/layout/` — Sidebar + Layout with topbar.
- `components/common/` — Clay cards, buttons, badges, inputs, tables, progress.

**Config-driven content**:
- `config/sidebarConfig.js` — sidebar structure and role permissions.
- `config/dashboardContent.js` — dashboard labels/content.
- `config/jobsContent.js` — jobs page content and labels.

## 5. LLM Instructions (Maintenance & Style)
- **Do not change folder structure.** Feature modules must remain nested under `modules/hiring/` (no flat modules).
- **No hardcoding of business values** (statuses, stages, roles, labels) in backend logic. Use DB or config-driven values.
- **Backend architecture rules**:
  - `router.py` = request/response only (no business logic).
  - `service.py` = business logic only.
  - `repository.py` = database access only.
  - Use dependency injection with `Depends`.
  - Async DB operations (`AsyncSession`).
- **Frontend architecture rules**:
  - Use functional components with hooks.
  - API calls must go through `frontend/src/services/*`.
  - Sidebar must be config-driven; no hardcoded JSX menus.
  - UI content (labels, status badges) should be config-driven, not hardcoded in components.
- **API route consistency**:
  - All hiring endpoints under `/api/v1/hiring/<module>`.
  - Maintain consistent response envelopes (`APIResponse`, `ListResponse`).
- **Styling**:
  - UI uses claymorphic styles defined in `frontend/src/index.css`.
  - Avoid introducing new CSS frameworks; extend existing styles.

---

**Source of truth files**
- Backend app entry: `/Users/rupayan/ai-hr-platform/backend/app/main.py`
- DB schema: `/Users/rupayan/ai-hr-platform/backend/db/schema.sql`
- DB seed: `/Users/rupayan/ai-hr-platform/backend/db/seed.sql`
- Frontend entry: `/Users/rupayan/ai-hr-platform/frontend/src/main.jsx`
- Frontend shell: `/Users/rupayan/ai-hr-platform/frontend/src/App.jsx`
- Sidebar config: `/Users/rupayan/ai-hr-platform/frontend/src/config/sidebarConfig.js`
