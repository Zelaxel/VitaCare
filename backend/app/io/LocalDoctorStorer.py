from architecture.io.DoctorStorer import DoctorStorer
from architecture.model.Doctor import Doctor
from sqlmodel import Session
from sqlalchemy import Engine
from app.io.DoctorData import DoctorData

class LocalDoctorStorer(DoctorStorer):

    def __init__(self, engine: Engine):
        self.__engine = engine

    @staticmethod
    def __toDoctorData(doctor: Doctor) -> DoctorData:
        """Maps doctor to DoctorData."""
        return DoctorData(credentials=doctor.credentials, name=doctor.name, surname=doctor.surname, department=doctor.department)
    
    def store(self, doctor):
        """Store doctor."""
        with Session(self.__engine) as session:
            doctorData = self.__toDoctorData(doctor)
            session.add(doctorData)
            session.commit()
