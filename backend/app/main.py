from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException as HttpException
from dataclasses import asdict
from sqlmodel import create_engine
from sqlalchemy import Engine
from sqlalchemy.exc import IntegrityError
from fastapi.middleware.cors import CORSMiddleware
from architecture.model.patient import Patient
from architecture.model.appointment import Appointment
from architecture.io.doctor_storer import Doctor_storer
from architecture.io.doctor_loader import Doctor_loader
from architecture.io.patient_storer import Patient_storer
from architecture.io.patient_loader import Patient_loader
from architecture.io.patient_updater import Patient_updater
from architecture.io.appointment_loader import Appointment_loader
from architecture.io.appointment_updater import Appointment_updater
from architecture.io.appointment_storer import Appointment_storer
from app.io.local_doctor_storer import Local_doctor_storer
from app.io.local_doctor_loader import Local_doctor_loader
from app.io.local_patient_storer import Local_patient_storer
from app.io.local_patient_loader import Local_patient_loader
from app.io.local_patient_updater import Local_patient_updater
from app.io.local_appointment_storer import Local_appointment_storer
from app.io.local_appointment_loader import Local_appointment_loader
from app.io.local_appointment_updater import Local_appointment_updater

# Variables -------------------------------------------------------

db_name = "vitacare"
engine: Engine = create_engine(f"sqlite:///./{db_name}.db")

doctor_storer: Doctor_storer = Local_doctor_storer(engine)
patient_storer: Patient_storer = Local_patient_storer(engine)
doctor_loader: Doctor_loader = Local_doctor_loader(engine)
patient_loader: Patient_loader = Local_patient_loader(engine)
patient_updater: Patient_updater = Local_patient_updater(engine)
appointment_storer: Appointment_storer = Local_appointment_storer(engine)
appointment_loader: Appointment_loader = Local_appointment_loader(engine)
appointment_updater: Appointment_updater = Local_appointment_updater(engine) 


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Appointments
@app.get("/appointment/by_patient/{identity_document}")
def get_appointments_by_patient(identity_document: str) -> list[dict]:
    return [asdict(appointment) for appointment in appointment_loader.load_by_patient(identity_document)]

@app.get("/appointment/by_doctor/{credentials}")
def get_appointments_by_doctor(credentials: str) -> list[dict]:
    return [asdict(appointment) for appointment in appointment_loader.load_by_doctor(credentials)]

@app.post("/appointment")
def create_appointment(appointment: Appointment):
    try:
        appointment_storer.store(appointment)
        return {"message": "Appointment created successfully", "patient": asdict(appointment)}
    except IntegrityError:
        raise HttpException(status_code=409, detail="Appointment already exists")

@app.put("/appointment/{id}")
def update_patient(id: int, updated_appointment: Appointment) -> dict:
    appointment = appointment_loader.load_by_id(id)
    
    if not appointment: raise HttpException(status_code=404, detail="Appointment not found")
    
    patient_updater.update(appointment)
    return {"message": "Patient updated successfully", "patient": asdict(updated_appointment)}
