from sqlmodel import SQLModel, Field

class DoctorData(SQLModel, table=True):
    credentials: str = Field(default=None, primary_key=True)
    name: str
    surname: str
    department: str