from pydantic import BaseModel


class PlaceholderResponse(BaseModel):
    ok: bool = True
