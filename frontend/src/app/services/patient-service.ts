import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/patient';

  constructor(private http: HttpClient) {}

  /** Get patient information by identity document */
  getPatient(identityDocument: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${identityDocument}`);
  }

  /** Get patient information by email */
  getPatientByEmail(email: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/by_email/${email}`);
  }

  /** Create a new patient record */
  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  /** Update an existing patient record */
  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${patient.identity_document}`, patient);
  }
}
