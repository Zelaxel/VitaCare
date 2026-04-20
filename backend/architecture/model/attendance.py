from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass(frozen=False)
class Attendance:
    id: int
    id_patient: str
    id_doctor: str
    title: str
    department: str
    attendance_date: date
    reason: str
    conclusion: Optional[str]
