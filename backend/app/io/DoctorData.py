from sqlmodel import SQLModel

class DoctorData(SQLModel, table=True):
    credentials: str
    name: str
    surname: str