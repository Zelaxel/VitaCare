from sqlmodel import Session, select
from architecture.io.patient_storer import Patient_storer
from architecture.model.patient import Patient
from sqlalchemy import Engine
from app.io.patient_data import Patient_data

class Local_patient_storer(Patient_storer):

    def __init__(self, engine: Engine):
        self.__engine = engine

    @staticmethod
    def __to_patient_data(patient_data: Patient) -> Patient_data:
        return Patient_data(
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
            adress = patient_data.adress,
            postal_code = patient_data.postal_code,
            city = patient_data.city,
            country = patient_data.country,
            phone_number = patient_data.phone_number,
            mail = patient_data.mail,
            password = patient_data.password,
            is_man = patient_data.is_man
        )
    
    def store(self, patient: Patient) -> None:
        with Session(self.__engine) as session:
            session.add(self.__to_patient_data(patient))
            session.commit()
