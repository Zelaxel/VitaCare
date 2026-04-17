from abc import ABC, abstractmethod
from architecture.model.doctor import Doctor

class Doctor_storer(ABC):
    @abstractmethod
    def store(self, doctor: Doctor) -> None:
        """Store doctor."""
        pass
