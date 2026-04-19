from sqlmodel import SQLModel, Field
from datetime import date
from typing import Optional

class Patient_data(SQLModel, table=True):
    identity_document: str = Field(primary_key=True)
    identity_document_expire: date
    sanitary_document: str
    sanitary_document_expire: date
    phone_number: int
    mail: str
    password: str
    identity_document_country: Optional[str] = Field(default=None)
    sanitary_document_country: Optional[str] = Field(default=None)
    name: Optional[str] = Field(default=None)
    surname: Optional[str] = Field(default=None)
    birth_date: Optional[date] = Field(default=None)
    birth_country: Optional[str] = Field(default=None)
    nationality: Optional[str] = Field(default=None)
    address: Optional[str] = Field(default=None)
    postal_code: Optional[int] = Field(default=None)
    city: Optional[str] = Field(default=None)
    country: Optional[str] = Field(default=None)