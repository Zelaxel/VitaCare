from sqlalchemy import Engine
from sqlmodel import Session, select
from app.io.appointment_data import Appointment_data
from architecture.model.appointment import Appointment
from architecture.io.appointment_loader import Appointment_loader

class Local_appointment_loader(Appointment_loader):
    
    def __init__(self, engine:Engine):
        self.__engine = engine

    @staticmethod
    def __to_appointment(attendance_data: Appointment_data) -> Appointment:
        return Appointment(
            id=attendance_data.id,
            id_patient=attendance_data.id_patient,
            id_doctor=attendance_data.id_doctor,
            title=attendance_data.title,
            department=attendance_data.department,
            attendance_date=attendance_data.attendance_date,
            reason=attendance_data.reason,
            conclusion=attendance_data.conclusion
        )

    def load_by_patient(self, identity_document: str) -> list[Appointment]:
        with Session(self.__engine) as session:
            query = select(Appointment_data).where(Appointment_data.id_patient == identity_document)
            attendance_data_list: Appointment_data = session.exec(query).all()
            return [self.__to_appointment(attendance_data) for attendance_data in attendance_data_list]
    
    def load_by_doctor(self, credentials: str) -> list[Appointment]:
        with Session(self.__engine) as session:
            query = select(Appointment_data).where(Appointment_data.id_doctor == credentials)
            attendance_data_list: Appointment_data = session.exec(query).all()
            return [self.__to_appointment(attendance_data) for attendance_data in attendance_data_list]
