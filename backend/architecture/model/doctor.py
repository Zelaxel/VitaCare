from dataclasses import dataclass

@dataclass(frozen=True)
class Doctor:
    credentials: str
    name: str
    mail: str
    surname: str
    department: str
    password: str