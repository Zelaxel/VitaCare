from abc import ABC, abstractmethod
from architecture.model.doctor import Doctor

class Doctor_loader(ABC):
    @abstractmethod
    def load(self, credentials:str) -> Doctor | None:
        """Returns doctor by his credentials."""
        pass
