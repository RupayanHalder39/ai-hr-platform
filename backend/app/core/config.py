from functools import lru_cache
from pydantic import BaseModel
import os


class Settings(BaseModel):
    app_name: str = os.getenv("APP_NAME", "AI HR Platform")
    api_prefix: str = os.getenv("API_PREFIX", "/api/v1")
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql+asyncpg://postgres:postgres@localhost:5432/ai_hr",
    )
    environment: str = os.getenv("ENVIRONMENT", "local")


@lru_cache
def get_settings() -> Settings:
    return Settings()
