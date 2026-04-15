from backend.architecture.io.DoctorLoader import DoctorLoader
from backend.architecture.model.Doctor import Doctor, select
from sqlmodel import Engine, Session
from DoctorData import DoctorData

class LocalDoctorLoader(DoctorLoader):

    def __init__(self, engine: Engine):
        self.__engine = engine

    def toDoctor(doctorData: DoctorData) -> Doctor:
        """Maps doctordata to Doctor."""
        return Doctor(doctorData.credentials, doctorData.name, doctorData.surname)
    
    def loadByCredentials(self, credentials: str) -> Doctor:
        """Returns doctor from local sqlite file by credentials."""
        with Session(self.__engine) as session:
            query = select(DoctorData).where(DoctorData.credentials == credentials)
            doctorData: DoctorData = session.exec(query).first()
            return self.toDoctor(doctorData) if doctorData else None
