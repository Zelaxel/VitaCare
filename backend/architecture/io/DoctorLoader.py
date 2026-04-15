from abc import ABC, abstractmethod
from backend.architecture.model.Doctor import Doctor

class DoctorLoader(ABC):
    @abstractmethod
    def loadByCredentials(self, credentials:str) -> Doctor | None:
        """Returns doctor by his credentials."""
        pass
