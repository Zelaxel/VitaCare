from architecture.io.DoctorLoader import DoctorLoader
from architecture.model.Doctor import Doctor
from sqlmodel import Session, select
from sqlalchemy import Engine
from app.io.DoctorData import DoctorData

class LocalDoctorLoader(DoctorLoader):

    def __init__(self, engine: Engine):
        self.__engine = engine

    @staticmethod
    def __toDoctor(doctorData: DoctorData) -> Doctor:
        """Maps doctordata to Doctor."""
        return Doctor(credentials=doctorData.credentials, name=doctorData.name, surname=doctorData.surname, department=doctorData.department)
    
    def load(self, credentials: str) -> Doctor:
        """Returns doctor from local sqlite file by credentials."""
        with Session(self.__engine) as session:
            query = select(DoctorData).where(DoctorData.credentials == credentials)
            doctorData: DoctorData = session.exec(query).first()
            return self.__toDoctor(doctorData) if doctorData else None

