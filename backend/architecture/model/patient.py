from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass(frozen=True)
class Patient:
    identity_document: str
    identity_document_expire: date
    sanitary_document: str
    sanitary_document_expire: date
    phone_number: int
    mail: str
    password: str
    identity_document_country: Optional[str] = None
    sanitary_document_country: Optional[str] = None
    name: Optional[str] = None
    surname: Optional[str] = None
    birth_date: Optional[date] = None
    birth_country: Optional[str] = None
    nationality: Optional[str] = None
    adress: Optional[str] = None
    postal_code: Optional[int] = None
    city: Optional[str] = None
    country: Optional[str] = None