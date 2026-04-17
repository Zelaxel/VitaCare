from sqlmodel import SQLModel, Field
from datetime import date
from typing import Optional

class Patient_data(SQLModel, table=True):
    identity_document: str = Field(primary_key=True)
    sanitary_document: str
    phone_number: int
    mail: str
    password: str
    is_man: bool
    identity_document_country: Optional[str] = Field(default=None)
    identity_document_expire: Optional[date] = Field(default=None)
    sanitary_document_country: Optional[str] = Field(default=None)
    sanitary_document_expire: Optional[date] = Field(default=None)
    name: Optional[str] = Field(default=None)
    surname: Optional[str] = Field(default=None)
    birth_date: Optional[date] = Field(default=None)
    birth_country: Optional[str] = Field(default=None)
    nationality: Optional[str] = Field(default=None)
    adress: Optional[str] = Field(default=None)
    postal_code: Optional[int] = Field(default=None)
    city: Optional[str] = Field(default=None)
    country: Optional[str] = Field(default=None)