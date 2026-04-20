from abc import ABC, abstractmethod
from architecture.model.attendance import Attendance

class Attendance_storer(ABC):

    @abstractmethod
    def store(attendance: Attendance) -> None:
        pass