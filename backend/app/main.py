import os
from sqlmodel import create_engine, SQLModel
from architecture.model.doctor import Doctor
from app.io.local_doctor_storer import Local_doctor_storer
from architecture.io.doctor_storer import Doctor_storer
from app.io.local_doctor_loader import Local_doctor_loader
from architecture.io.doctor_loader import Doctor_loader

dbName = "vitacare"
engine = create_engine(f"sqlite:///./{dbName}.db")

def init_database():
    doctors = [
        Doctor(credentials="0", name="John", surname="Ramírez", department="cardiology", password=1234),
        Doctor(credentials="1", name="Lina", surname="García", department="laboratory", password=1234),
        Doctor(credentials="2", name="Pedro", surname="López", department="cardiology", password=1234),
        Doctor(credentials="3", name="Juan", surname="Pérez", department="radiology", password=1234),
        Doctor(credentials="4", name="Mariana", surname="González", department="ophthalmology", password=1234),
        Doctor(credentials="5", name="Ruben", surname="Grizón", department="dentistry", password=1234),
        Doctor(credentials="6", name="Laura", surname="Domínguez", department="dermatology", password=1234),
    ]

    SQLModel.metadata.create_all(engine)
    doctorStorer: Doctor_storer = Local_doctor_storer(engine)
    for doctor in doctors:
        doctorStorer.store(doctor)
    
if not os.path.exists(f"./{dbName}.db"):
    init_database()

