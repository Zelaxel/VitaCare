from abc import ABC, abstractmethod
from architecture.model.appointment import Appointment

class Appointment_updater(ABC):
    @abstractmethod
    def update(self, appointment: Appointment) -> None:
        pass