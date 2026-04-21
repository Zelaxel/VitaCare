from abc import ABC, abstractmethod
from architecture.model.doctor import Doctor

class Doctor_loader(ABC):
    @abstractmethod
    def load_by_credentials(self, credentials: str) -> Doctor | None:
        """Returns doctor by his credentials."""
        pass
    
    @abstractmethod
    def load_by_department(self, department: str) -> list[Doctor]:
        """Returns doctor by his department."""
        pass
