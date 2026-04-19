from abc import ABC, abstractmethod
from architecture.model.patient import Patient

class Patient_updater(ABC):
    @abstractmethod
    def update(self, patient: Patient) -> None:
        pass