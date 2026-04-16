from abc import ABC, abstractmethod
from architecture.model.Doctor import Doctor

class DoctorLoader(ABC):
    @abstractmethod
    def load(self, credentials:str) -> Doctor | None:
        """Returns doctor by his credentials."""
        pass
