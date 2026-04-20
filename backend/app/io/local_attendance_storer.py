from app.io.attendance_data import Attendance_data
from architecture.model.attendance import Attendance
from architecture.io.attendance_storer import Attendance_storer
from sqlmodel import Session
from sqlalchemy import Engine

class Local_attendance_storer(Attendance_storer):

    def __init__(self, engine:Engine):
        self.__engine = engine

    @staticmethod
    def __to_attendance_data(attendance: Attendance):
        return Attendance_data(
            id=attendance.id,
            id_patient=attendance.id_patient,
            id_doctor=attendance.id_doctor,
            title=attendance.title,
            department=attendance.department,
            attendance_date=attendance.attendance_date,
            reason=attendance.reason,
            conclusion=attendance.conclusion
        )
    
    def store(self, attendance: Attendance) -> None:
        with Session(self.__engine) as session:
            session.add(self.__to_attendance_data(attendance))
            session.commit()
