from sqlalchemy import Engine
from sqlmodel import Session, select
from architecture.io.appointment_updater import Appointment_updater
from app.io.appointment_data import Appointment_data
from architecture.model.appointment import Appointment

class Local_appointment_updater(Appointment_updater):
    
    def __init__(self, engine: Engine):
        self.__engine = engine

    @staticmethod
    def __to_appointment_data(attendance: Appointment) -> Appointment_data:
        return Appointment_data(
            id=attendance.id,
            id_patient=attendance.id_patient,
            id_doctor=attendance.id_doctor,
            title=attendance.title,
            department=attendance.department,
            attendance_date=attendance.attendance_date,
            reason=attendance.reason,
            conclusion=attendance.conclusion,
            active=attendance.active
        )
    
    def update(self, appointment: Appointment) -> None:
        appointment_data = self.__to_appointment_data(appointment)
        with Session(self.__engine) as session:
            result = session.exec(select(Appointment_data).where(Appointment_data.id == appointment_data.id)).first()
            
            if not result: return # No appointment found with the given id, do nothing.

            update = appointment_data.model_dump(exclude={"id"})
            for key, value in update.items():
                setattr(result, key, value)
            
            session.add(result)
            session.commit()
