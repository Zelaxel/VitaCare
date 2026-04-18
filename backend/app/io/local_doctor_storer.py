from architecture.io.doctor_storer import Doctor_storer
from architecture.model.doctor import Doctor
from sqlmodel import Session
from sqlalchemy import Engine
from app.io.doctor_data import Doctor_data

class Local_doctor_storer(Doctor_storer):

    def __init__(self, engine: Engine):
        self.__engine = engine

    @staticmethod
    def __toDoctorData(doctor: Doctor) -> Doctor_data:
        """Maps doctor to DoctorData."""
        return Doctor_data(
            credentials=doctor.credentials,
            name=doctor.name,
            surname=doctor.surname,
            department=doctor.department,
            password=doctor.password
        )
    
    def store(self, doctor) -> None:
        """Store doctor."""
        with Session(self.__engine) as session:
            session.add(self.__toDoctorData(doctor))
            session.commit()
