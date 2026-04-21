from app.io.appointment_data import Appointment_data
from architecture.model.attendance import Appointment
from architecture.io.appointment_storer import Appointment_storer
from sqlmodel import Session
from sqlalchemy import Engine

class Local_appointment_storer(Appointment_storer):

    def __init__(self, engine:Engine):
        self.__engine = engine

    @staticmethod
    def __to_attendance_data(attendance: Appointment):
        return Appointment_data(
            id=attendance.id,
            id_patient=attendance.id_patient,
            id_doctor=attendance.id_doctor,
            title=attendance.title,
            department=attendance.department,
            attendance_date=attendance.attendance_date,
            reason=attendance.reason,
            conclusion=attendance.conclusion
        )
    
    def store(self, attendance: Appointment) -> None:
        with Session(self.__engine) as session:
            session.add(self.__to_attendance_data(attendance))
            session.commit()
