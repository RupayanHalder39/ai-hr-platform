from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.db.session import get_session
from app.modules.hiring.candidates.router import router as candidates_router
from app.modules.hiring.jobs.router import router as jobs_router
from app.modules.hiring.dashboard.router import router as hiring_dashboard_router
from app.modules.hiring.assignments.router import router as assignments_router
from app.modules.hiring.interviews.router import router as interviews_router
from app.modules.hiring.offers.router import router as offers_router
from app.modules.hiring.settings.router import router as settings_router
from app.modules.attendance.router import router as attendance_router
from app.modules.payroll.router import router as payroll_router
from app.modules.performance.router import router as performance_router
from app.modules.leave.router import router as leave_router
from app.modules.onboarding.router import router as onboarding_router
from app.utils.ws import ConnectionManager

settings = get_settings()
app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()

app.include_router(candidates_router)
app.include_router(jobs_router)
app.include_router(hiring_dashboard_router)
app.include_router(assignments_router)
app.include_router(interviews_router)
app.include_router(offers_router)
app.include_router(settings_router)
app.include_router(attendance_router)
app.include_router(payroll_router)
app.include_router(performance_router)
app.include_router(leave_router)
app.include_router(onboarding_router)


@app.get("/api/v1/health")
async def health_check(session: AsyncSession = Depends(get_session)):
    try:
        await session.execute(text("SELECT 1"))
        return {"ok": True}
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc))


@app.websocket("/api/v1/ws/notifications")
async def notifications_socket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
