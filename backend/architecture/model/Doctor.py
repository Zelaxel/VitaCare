from dataclasses import dataclass

@dataclass(frozen=True)
class Doctor:
    credentials: str
    name: str
    surname: str
    department: str