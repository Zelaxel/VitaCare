from dataclasses import dataclass
from datetime import date

@dataclass(frozen=False)
class Attendance:
    id: int
    id_patient: str
    id_doctor: str
    department: str
    title: str
    reason: str
    title: str
    conclusion: str
    attendance_date: date
