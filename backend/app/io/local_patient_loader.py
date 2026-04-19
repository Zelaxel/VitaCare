from architecture.io.patient_loader import Patient_loader
from architecture.model.patient import Patient
from sqlmodel import Session, select
from sqlalchemy import Engine
from app.io.patient_data import Patient_data

class Local_patient_loader(Patient_loader):
    
    def __init__(self, engine: Engine):
        self.__engine = engine
    
    @staticmethod
    def __to_patient(patient_data: Patient_data) -> Patient:
        return Patient(
            identity_document = patient_data.identity_document,
            identity_document_country = patient_data.identity_document_country,
            identity_document_expire = patient_data.identity_document_expire,
            sanitary_document = patient_data.sanitary_document,
            sanitary_document_country = patient_data.sanitary_document_country,
            sanitary_document_expire = patient_data.sanitary_document_expire,
            name = patient_data.name,
            surname = patient_data.surname,
            birth_date = patient_data.birth_date,
            birth_country = patient_data.birth_country,
            nationality = patient_data.nationality,
            address = patient_data.address,
            postal_code = patient_data.postal_code,
            city = patient_data.city,
            country = patient_data.country,
            phone_number = patient_data.phone_number,
            mail = patient_data.mail,
            password = patient_data.password,
        )

    def load(self, identity_document: str) -> Patient:
        with Session(self.__engine) as session:
            statement = select(Patient_data).where(Patient_data.identity_document == identity_document)
            patient_data = session.exec(statement).first()
            return self.__to_patient(patient_data) if patient_data else None