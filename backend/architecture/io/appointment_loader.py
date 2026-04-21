from abc import ABC, abstractmethod
from architecture.model.appointment import Appointment

class Appointment_loader(ABC):

    @abstractmethod
    def load_by_patient(self, identity_document: str) -> Appointment:
        pass

    @abstractmethod
    def load_by_doctor(self, credentials: str) -> Appointment:
        pass
