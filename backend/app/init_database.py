from datetime import datetime
from datetime import date
from sqlmodel import create_engine, SQLModel
from sqlalchemy.exc import IntegrityError
from architecture.model.doctor import Doctor
from architecture.model.patient import Patient
from architecture.model.appointment import Appointment
from architecture.io.doctor_storer import Doctor_storer
from architecture.io.patient_storer import Patient_storer
from architecture.io.appointment_storer import Appointment_storer
from app.io.local_doctor_storer import Local_doctor_storer
from app.io.local_patient_storer import Local_patient_storer
from app.io.local_appointment_storer import Local_appointment_storer

db_name = "vitacare"
engine = create_engine(f"sqlite:///./{db_name}.db")
SQLModel.metadata.create_all(engine)

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

appointments = [
]

doctor_storer: Doctor_storer = Local_doctor_storer(engine)
patient_storer: Patient_storer = Local_patient_storer(engine)
attendance_storer: Appointment_storer = Local_appointment_storer(engine)

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

for attendance in appointments:
    try:
        attendance_storer.store(attendance)
    except IntegrityError:
        continue
