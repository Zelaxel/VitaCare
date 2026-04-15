from dataclasses import dataclass, Field

@dataclass(frozen=True)
class Doctor:
    credentials: str = Field(default=None, primary_key=True)
    name: str
    surname: str