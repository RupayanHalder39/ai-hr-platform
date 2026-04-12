import asyncio
from typing import Any, Dict


async def _retryable(task_name: str, payload: Dict[str, Any], retries: int = 3, delay: float = 0.5) -> Dict[str, Any]:
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            await asyncio.sleep(0.1)
            return {
                "task": task_name,
                "status": "success",
                "attempt": attempt,
                "result": {"payload": payload},
            }
        except Exception as exc:  # pragma: no cover - placeholder for real AI call
            last_error = exc
            await asyncio.sleep(delay * attempt)
    return {
        "task": task_name,
        "status": "failed",
        "error": str(last_error) if last_error else "unknown_error",
    }


async def generate_job_description(payload: Dict[str, Any]) -> Dict[str, Any]:
    return await _retryable("jd_generator", payload)


async def evaluate_assignment(payload: Dict[str, Any]) -> Dict[str, Any]:
    return await _retryable("assignment_evaluator", payload)


async def analyze_interview(payload: Dict[str, Any]) -> Dict[str, Any]:
    return await _retryable("interview_analyzer", payload)
