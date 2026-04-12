from app.modules.hiring.assignments.repository import PlaceholderRepository


class PlaceholderService:
    def __init__(self, repository: PlaceholderRepository) -> None:
        self.repository = repository

    async def get(self):
        # TODO: implement business logic
        return {"ok": True}
