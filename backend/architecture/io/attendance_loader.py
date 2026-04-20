from abc import ABC, abstractmethod
from architecture.model.attendance import Attendance

class Attendance_loader(ABC):

    @abstractmethod
    def load_by_patient(self, identity_document: str) -> Attendance:
        pass

    @abstractmethod
    def load_by_doctor(self, credentials: str) -> Attendance:
        pass

    @abstractmethod
    def load(self, credentials:str, identity_docuemnt:str) -> Attendance:
        pass
