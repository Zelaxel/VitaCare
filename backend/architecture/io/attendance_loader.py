from abc import ABC, abstractmethod
from architecture.model.attendance import Attendance

class Attendance_loader(ABC):

    @abstractmethod
    def load_by_patient(identity_document: str) -> Attendance:
        pass

    @abstractmethod
    def load_by_doctor(credentials: str) -> Attendance:
        pass

    @abstractmethod
    def load(credentials:str, identity_docuemnt:str) -> Attendance:
        pass
