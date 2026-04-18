import os
from fastapi import FastAPI
from dataclasses import asdict
from sqlmodel import create_engine, SQLModel
from architecture.model.doctor import Doctor
from app.io.local_doctor_storer import Local_doctor_storer
from app.io.local_doctor_loader import Local_doctor_loader
from architecture.io.doctor_storer import Doctor_storer
from architecture.io.doctor_loader import Doctor_loader
from architecture.model.patient import Patient
from app.io.local_patient_storer import Local_patient_storer
from app.io.local_patient_loader import Local_patient_loader
from architecture.io.patient_storer import Patient_storer
from architecture.io.patient_loader import Patient_loader
from sqlalchemy.exc import IntegrityError

# Variables -------------------------------------------------------

db_name = "vitacare"
engine = create_engine(f"sqlite:///./{db_name}.db")
SQLModel.metadata.create_all(engine)

doctorStorer: Doctor_storer = Local_doctor_storer(engine)
patient_storer: Patient_storer = Local_patient_storer(engine)
doctor_loader: Doctor_loader = Local_doctor_loader(engine)
patient_loader: Patient_loader = Local_patient_loader(engine)

app = FastAPI()

# Initialization -------------------------------------------------------

doctors = [
    Doctor(credentials="0", name="John", surname="Ramírez", department="cardiology", password=1234),
    Doctor(credentials="1", name="Lina", surname="García", department="laboratory", password=1234),
    Doctor(credentials="2", name="Pedro", surname="López", department="cardiology", password=1234),
    Doctor(credentials="3", name="Juan", surname="Pérez", department="radiology", password=1234),
    Doctor(credentials="4", name="Mariana", surname="González", department="ophthalmology", password=1234),
    Doctor(credentials="5", name="Ruben", surname="Grizón", department="dentistry", password=1234),
    Doctor(credentials="6", name="Laura", surname="Domínguez", department="dermatology", password=1234),
]
for doctor in doctors:
    try:
        doctorStorer.store(doctor)
    except IntegrityError:
        continue
print("Database initialized with doctors")

# API -------------------------------------------------------

# Patients
@app.get("/patient/{identity_document}")
def get_patient(identity_document: str) -> dict:
    patient = patient_loader.load(identity_document)
    return asdict(patient) if patient else {"message": "Patient not found"}

@app.post("/patient/")
def create_patient(patient: Patient) -> dict:
    try:
        patient_storer.store(patient)
        return {"message": "Patient created successfully", "patient": asdict(patient)}
    except IntegrityError:
        return {"message": "Patient with this identity document already exists"}

# Doctors
@app.get("/doctor/{credentials}")
def get_doctor(credentials: str) -> dict:
    print(doctor_loader.load('0'))
    doctor = doctor_loader.load(credentials)
    return asdict(doctor) if doctor else {"message": "Doctor not found"}
