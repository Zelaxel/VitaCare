import os
from sqlmodel import create_engine, SQLModel
from architecture.model.Doctor import Doctor
from app.io.LocalDoctorStorer import LocalDoctorStorer
from architecture.io.DoctorStorer import DoctorStorer

dbName = "vitacare"

def init_database():
    doctors = [
        Doctor(credentials="0", name="John", surname="Ramírez", department="cardiology"),
        Doctor(credentials="1", name="Lina", surname="García", department="laboratory"),
        Doctor(credentials="2", name="Pedro", surname="López", department="cardiology"),
        Doctor(credentials="3", name="Juan", surname="Pérez", department="radiology"),
        Doctor(credentials="4", name="Mariana", surname="González", department="ophthalmology"),
        Doctor(credentials="5", name="Ruben", surname="Grizón", department="dentistry"),
        Doctor(credentials="6", name="Laura", surname="Domínguez", department="dermatology"),
    ]

    engine = create_engine(f"sqlite:///./{dbName}.db")
    SQLModel.metadata.create_all(engine)

    doctorStorer: DoctorStorer = LocalDoctorStorer(engine)
    for doctor in doctors:
        doctorStorer.store(doctor)

if not os.path.exists(f"./{dbName}.db"):
    init_database()