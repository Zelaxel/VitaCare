from sqlmodel import SQLModel, Field

class Doctor_data(SQLModel, table=True):
    credentials: str = Field(default=None, primary_key=True)
    name: str
    mail: str
    surname: str
    department: str
    password: str