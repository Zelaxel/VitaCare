from sqlmodel import SQLModel, Field
from datetime import date
from typing import Optional

class Appointment_data(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_patient: str = Field(foreign_key="patient_data.identity_document")
    id_doctor: str = Field(foreign_key="doctor_data.credentials")
    title: str
    department: str
    attendance_date: date
    reason: str
    conclusion: Optional[str]
