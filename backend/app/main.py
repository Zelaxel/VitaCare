from fastapi import FastAPI
from fastapi import Body
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
from architecture.io.appointment_deleter import Appointment_deleter
from app.io.local_doctor_storer import Local_doctor_storer
from app.io.local_doctor_loader import Local_doctor_loader
from app.io.local_patient_storer import Local_patient_storer
from app.io.local_patient_loader import Local_patient_loader
from app.io.local_patient_updater import Local_patient_updater
from app.io.local_appointment_storer import Local_appointment_storer
from app.io.local_appointment_loader import Local_appointment_loader
from app.io.local_appointment_updater import Local_appointment_updater
from app.io.local_appointment_deleter import Local_appointment_deleter
from dotenv import load_dotenv
import os
import requests

load_dotenv()

CLIENT_ID = os.getenv("CRONOFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("CRONOFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("CRONOFY_REDIRECT_URI")

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
appointment_deleter: Appointment_deleter = Local_appointment_deleter(engine)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API -------------------------------------------------------

# URL OAuth
@app.get("/cronofy-auth")
def cronofy_auth():

    auth_url = (
        "https://app-uk.cronofy.com/oauth/authorize"
        f"?response_type=code"
        f"&client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope=read_events create_event delete_event read_free_busy"
        f"&avoid_linking=true"
        f"&prompt=select_account"
    )

    return {
        "url": auth_url
    }

@app.post("/cronofy/revoke")
def revoke_token(token: str = Body(..., embed=True)):
    response = requests.post(
        "https://api-uk.cronofy.com/oauth/token/revoke",
        json={
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "token": token
        }
    )
    return {"status": "revoked"}

# Adding endpoint
@app.post("/cronofy/create-event")
def create_cronofy_event(data: dict = Body(...)):
    required_keys = ["calendar_id", "token", "event_id", "title", "start", "end"]
    for key in required_keys:
        if key not in data:
            print(f"ERROR: Falta la clave {key} en los datos recibidos")
            raise HttpException(status_code=400, detail=f"Missing key: {key}")

    print(f"DEBUG: Intentando crear evento en calendario: {data['calendar_id']}")

    try:
        response = requests.post(
            f"https://api-uk.cronofy.com/v1/calendars/{data['calendar_id']}/events",
            headers={
                "Authorization": f"Bearer {data['token']}",
                "Content-Type": "application/json; charset=utf-8"
            },
            json={
                "event_id": data["event_id"],
                "summary": data["title"],
                "description": data.get("description", ""),
                "start": data["start"],
                "end": data["end"]
            },
            timeout=10
        )

        if response.status_code not in [200, 202]:
            print(f"CRONOFY ERROR: {response.status_code} - {response.text}")
            raise HttpException(status_code=response.status_code, detail=response.text)

        if not response.text:
            return {"status": "success", "message": "Event created"}
            
        return response.json()

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        raise HttpException(status_code=500, detail=str(e))

# Obtain calendar_id
@app.get("/cronofy/calendars")
def get_calendars(token: str):
    response = requests.get(
        "https://api-uk.cronofy.com/v1/calendars",
        headers={"Authorization": f"Bearer {token}"}
    )
    if response.status_code != 200:
        raise HttpException(status_code=response.status_code, detail=response.text)
    return response.json()

# Change Tokens
@app.post("/exchange-token")
def exchange_token(data = Body(...)):

    code = data["code"]

    response = requests.post(
        "https://api-uk.cronofy.com/oauth/token",
        json={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET
        }
    )

    return response.json()

# Doctors verification 
@app.post("/login/doctor-log-in")
def login_doctor(data: dict) -> dict:
    doctor = doctor_loader.load_by_credentials(data.get("credentials"))
    
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
    doctor = doctor_loader.load_by_credentials(credentials)
    
    if not doctor: raise HttpException(status_code=404, detail="Doctor not found")
    
    return asdict(doctor)

@app.get("/doctor/by_department/{department}")
def get_doctor(department: str) -> list[dict]:
    return [asdict(doctor) for doctor in doctor_loader.load_by_department(department)]

@app.get("/departments")
def get_departments() -> list[str]:
    doctors = doctor_loader.load_all()
    departments = list(set([doctor.department for doctor in doctors]))
    return departments

# Appointments
@app.get("/appointment/by_patient/{identity_document}")
def get_appointments_by_patient(identity_document: str) -> list[dict]:
    return [asdict(appointment) for appointment in appointment_loader.load_by_patient(identity_document)]

@app.get("/appointment/by_doctor/{credentials}")
def get_appointments_by_doctor(credentials: str) -> list[dict]:
    return [asdict(appointment) for appointment in appointment_loader.load_by_doctor(credentials)]

@app.get("/appointment/{id}")
def get_appointment_by_id(id: int) -> dict:
    appointment = appointment_loader.load_by_id(id)
    if not appointment: 
        raise HttpException(status_code=404, detail="Appointment not found")
    return asdict(appointment)
    
@app.post("/appointment")
def create_appointment(appointment: Appointment):
    try:
        appointment_storer.store(appointment)
        return {"message": "Appointment created successfully", "patient": asdict(appointment)}
    except IntegrityError:
        raise HttpException(status_code=409, detail="Appointment already exists")

@app.put("/appointment/{id}")
def update_appointment(id: int, updated_appointment: Appointment) -> dict:
    appointment = appointment_loader.load_by_id(id)
    if not appointment: 
        raise HttpException(status_code=404, detail="Appointment not found")
    
    # Qui aggiorniamo la visita (conclusione del dottore), non il paziente!
    appointment_updater.update(updated_appointment)
    
    return {
        "message": "Appointment updated successfully", 
        "appointment": asdict(updated_appointment)
    }

@app.delete("/appointment/{id}")
def delete_appointment(id: int) -> None:
    appointment_deleter.delete(id)