from pydantic import BaseModel


class StageRead(BaseModel):
    id: int
    name: str
    order_index: int

    class Config:
        from_attributes = True


class JobRead(BaseModel):
    id: int
    title: str

    class Config:
        from_attributes = True


class StatusRead(BaseModel):
    id: int
    entity_type: str
    name: str

    class Config:
        from_attributes = True
