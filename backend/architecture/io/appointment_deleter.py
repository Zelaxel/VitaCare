from abc import ABC, abstractclassmethod

class Appointment_deleter(ABC):

    @abstractclassmethod
    def delete(self, id: int) -> None:
        pass
