from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass(frozen=True)
class Patient:
    identity_document: str
    identity_document_country: str
    identity_document_expire: Optional[date]
    sanitary_document: str
    sanitary_document_country: Optional[str]
    sanitary_document_expire: date
    name: Optional[str]
    surname: Optional[str]
    birth_date: Optional[date]
    birth_country: Optional[str]
    nationality: Optional[str]
    adress: Optional[str]
    postal_code: Optional[int]
    city: Optional[str]
    country: Optional[str]
    phone_number: int
    mail: str
    password: str
    is_man: bool