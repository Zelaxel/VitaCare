from architecture.io.appointment_deleter import Appointment_deleter 
from sqlalchemy import Engine
from sqlmodel import Session, delete
from app.io.appointment_data import Appointment_data

class Local_appointment_deleter(Appointment_deleter):

    def __init__(self, engine: Engine):
        self.__engine = engine

    def delete(self, id: int) -> None:
        with Session(self.__engine) as session:
            session.exec(delete(Appointment_data).where(Appointment_data.id == id))
            session.commit()