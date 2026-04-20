from sqlmodel import SQLModel, Field
from datetime import date
from typing import Optional

class Attendance(SQLModel):
    id: int = Field(primary_key=True)
    id_patient: str = Field(foreign_key="Patient_data.identity_document")
    id_doctor: str = Field(foreign_key="Doctor_data.credentials")
    title: str
    department: str
    attendance_date: date
    reason: str
    conclusion: Optional[str]
