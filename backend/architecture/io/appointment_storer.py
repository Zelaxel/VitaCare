from abc import ABC, abstractmethod
from architecture.model.attendance import Appointment

class Appointment_storer(ABC):

    @abstractmethod
    def store(self, sattendance: Appointment) -> None:
        pass