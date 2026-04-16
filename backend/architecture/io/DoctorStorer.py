from abc import ABC, abstractmethod
from architecture.model.Doctor import Doctor

class DoctorStorer(ABC):
    @abstractmethod
    def store(self, doctor: Doctor) -> None:
        """Store doctor."""
        pass
