from architecture.io.doctor_loader import Doctor_loader
from architecture.model.doctor import Doctor
from sqlmodel import Session, select
from sqlalchemy import Engine
from app.io.doctor_data import Doctor_data
from datetime import datetime
from app.io.appointment_data import Appointment_data

class Local_doctor_loader(Doctor_loader):

    def __init__(self, engine: Engine):
        self.__engine = engine

    @staticmethod
    def __toDoctor(doctor_data: Doctor_data) -> Doctor:
        """Maps doctordata to Doctor."""
        return Doctor(
            credentials=doctor_data.credentials,
            name=doctor_data.name,
            surname=doctor_data.surname,
            department=doctor_data.department,
            password=doctor_data.password,
            mail=doctor_data.mail
        )
    
    def load_by_credentials(self, credentials: str) -> Doctor:
        """Returns doctor from local sqlite file by credentials."""
        with Session(self.__engine) as session:
            query = select(Doctor_data).where(Doctor_data.credentials == credentials)
            doctor_data: Doctor_data = session.exec(query).first()
            return self.__toDoctor(doctor_data) if doctor_data else None
    
    def load_by_department(self, department: str):
        """Returns doctor list by department."""
        with Session(self.__engine) as session:
            query = select(Doctor_data).where(Doctor_data.department == department)
            doctor_datas: list[Doctor_data] = session.exec(query).all()
            return [self.__toDoctor(doctor_data) for doctor_data in doctor_datas]
        
    def load_all(self) -> list[Doctor]:
        with Session(self.__engine) as session:
            query = select(Doctor_data)
            doctor_datas = session.exec(query).all()
            return [self.__toDoctor(doctor_data) for doctor_data in doctor_datas]
        
    def check_disponibility(self, credentials: str, date: datetime) -> bool:
        with Session(self.__engine) as session:
            statement = select(Appointment_data).where(Appointment_data.attendance_date == date, Appointment_data.id_doctor == credentials)
            appointment_data = session.exec(statement).first()
            return appointment_data is None

