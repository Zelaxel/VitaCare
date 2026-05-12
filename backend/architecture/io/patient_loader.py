from abc import ABC, abstractmethod
from architecture.model.patient import Patient

class Patient_loader(ABC):
    @abstractmethod
    def load(self, identity_document: str) -> Patient | None:
        """Returns patient by his identity_document."""
        pass

    @abstractmethod
    def load_by_email(self, email: str) -> Patient | None:
        """Returns patient by his identity_document."""
        pass