from sqlmodel import Session, select
from architecture.io.patient_updater import Patient_updater
from architecture.model.patient import Patient
from sqlalchemy import Engine
from app.io.patient_data import Patient_data

class Local_patient_updater(Patient_updater):

    def __init__(self, engine: Engine):
        self.__engine = engine

    @staticmethod
    def __to_patient_data(patient_data: Patient) -> Patient_data:
        """Maps patient to PatientData."""
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
            address = patient_data.address,
            postal_code = patient_data.postal_code,
            city = patient_data.city,
            country = patient_data.country,
            phone_number = patient_data.phone_number,
            mail = patient_data.mail,
            password = patient_data.password,
        )
    
    def update(self, patient: Patient) -> None:
        """Update patient."""
        patient_data = self.__to_patient_data(patient)
        with Session(self.__engine) as session:
            result = session.exec(select(Patient_data).where(Patient_data.identity_document == patient.identity_document)).first()
            
            if not result: return # No patient found with the given identity document, do nothing.
        
            # Convert patient_data to dict and update result.
            update = patient_data.model_dump(exclude={"identity_document"})
            for key, value in update.items():
                setattr(result, key, value)
            session.add(result)
            session.commit()