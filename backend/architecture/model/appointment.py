from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass(frozen=False)
class Appointment:
    id_patient: str
    id_doctor: str
    title: str
    department: str
    attendance_date: datetime
    reason: str
    active: bool
    id: Optional[int] = None
    conclusion: Optional[str] = None
    event_id: Optional[str] = None
