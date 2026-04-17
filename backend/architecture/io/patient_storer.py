from abc import ABC, abstractmethod
from architecture.model.patient import Patient

class Patient_storer(ABC):
    @abstractmethod
    def store(self, patient: Patient) -> None:
        """Store patient."""
        pass
