from datetime import date
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException as HttpException
from dataclasses import asdict
from sqlmodel import create_engine, SQLModel
from architecture.model.doctor import Doctor
from architecture.model.patient import Patient
from architecture.io.doctor_storer import Doctor_storer
from architecture.io.doctor_loader import Doctor_loader
from architecture.io.patient_storer import Patient_storer
from architecture.io.patient_loader import Patient_loader
from architecture.io.patient_updater import Patient_updater
from app.io.local_doctor_storer import Local_doctor_storer
from app.io.local_doctor_loader import Local_doctor_loader
from app.io.local_patient_storer import Local_patient_storer
from app.io.local_patient_loader import Local_patient_loader
from app.io.local_patient_updater import Local_patient_updater
from sqlalchemy.exc import IntegrityError
from fastapi.middleware.cors import CORSMiddleware


# Variables -------------------------------------------------------

db_name = "vitacare"
engine = create_engine(f"sqlite:///./{db_name}.db")
SQLModel.metadata.create_all(engine)

doctor_storer: Doctor_storer = Local_doctor_storer(engine)
patient_storer: Patient_storer = Local_patient_storer(engine)
doctor_loader: Doctor_loader = Local_doctor_loader(engine)
patient_loader: Patient_loader = Local_patient_loader(engine)
patient_updater: Patient_updater = Local_patient_updater(engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"], # El puerto de tu Angular
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

patients = [
    Patient(identity_document="0", identity_document_expire=date(2030, 1, 1), sanitary_document="A12345678", sanitary_document_expire=date(2045, 1, 1), phone_number=1234567890, mail="hola0@gmail.com", password="1234"),
    Patient(identity_document="1", identity_document_expire=date(2030, 1, 1), sanitary_document="A12345679", sanitary_document_expire=date(2045, 1, 1), phone_number=1234567891, mail="hola1@gmail.com", password="1234"),
    Patient(identity_document="2", identity_document_expire=date(2030, 1, 1), sanitary_document="A12345680", sanitary_document_expire=date(2045, 1, 1), phone_number=1234567892, mail="hola2@gmail.com", password="1234"),
    Patient(identity_document="3", identity_document_expire=date(2030, 1, 1), sanitary_document="A12345681", sanitary_document_expire=date(2045, 1, 1), phone_number=1234567893, mail="hola3@gmail.com", password="1234"),
]

for doctor in doctors:
    try:
        doctor_storer.store(doctor)
    except IntegrityError:
        continue

for patient in patients:
    try:
        patient_storer.store(patient)
    except IntegrityError:
        continue

print("Database initialized")

# API -------------------------------------------------------

# Doctors verification 
@app.post("/login/doctor-log-in")
def login_doctor(data: dict) -> dict:
    doctor = doctor_loader.load(data.get("credentials"))
    
    if doctor and str(doctor.password) == str(data.get("password")):
        return {"status": "success", "message": "Login correcto", "doctor": asdict(doctor)}
    else:
        return {"status": "error", "message": "Credenciales inválidas"}
    
# Patients verification 
@app.post("/login/log-in")
def login_patient(data: dict) -> dict:
    patient = patient_loader.load(data.get("identity_document"))
    
    if patient and str(patient.password) == str(data.get("password")):
        return {"status": "success", "message": "Login correcto", "patient": asdict(patient)}
    else:
        return {"status": "error", "message": "Acceso inválido"}

# Patients
@app.get("/patient/{identity_document}")
def get_patient(identity_document: str) -> dict:
    patient = patient_loader.load(identity_document)
    if not patient: raise HttpException(status_code=404, detail="Patient not found")
    return asdict(patient)

@app.post("/patient")
def create_patient(patient: Patient) -> dict:
    try:
        patient_storer.store(patient)
        return {"message": "Patient created successfully", "patient": asdict(patient)}
    except IntegrityError:
        raise HttpException(status_code=409, detail="Patient already exists")
    
@app.put("/patient/{identity_document}")
def update_patient(identity_document: str, updated_patient: Patient) -> dict:
    patient = patient_loader.load(identity_document)
    
    if not patient: raise HttpException(status_code=404, detail="Patient not found")
    
    patient_updater.update(updated_patient)
    return {"message": "Patient updated successfully", "patient": asdict(updated_patient)}

# Doctors
@app.get("/doctor/{credentials}")
def get_doctor(credentials: str) -> dict:
    doctor = doctor_loader.load(credentials)
    
    if not doctor: raise HttpException(status_code=404, detail="Doctor not found")
    
    return asdict(doctor)
