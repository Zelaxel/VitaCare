import { Injectable } from '@angular/core';
import { AppointmentData } from '../model/appointment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://127.0.0.1:8000/appointment';

  constructor(private http: HttpClient) {}

  /** Get appointment by patient */
  getAppointmentByPatient(identityDocument: string): Observable<AppointmentData[]> {
    return this.http.get<AppointmentData[]>(`${this.apiUrl}/by_patient/${identityDocument}`)
  }

  /** Get appointment by doctor */
  getAppointmentByDoctor(credentials: string): Observable<AppointmentData[]> {
    return this.http.get<AppointmentData[]>(`${this.apiUrl}/by_doctor/${credentials}`)

  }

  /** Create an appointment */
  createAppointment(appointment: AppointmentData): Observable<AppointmentData> {
    return this.http.post<AppointmentData>(this.apiUrl, appointment)
  }

  /** Update an existing appointment */
  updateAppointment(appointment: AppointmentData): Observable<AppointmentData> {
    return this.http.put<AppointmentData>(`${this.apiUrl}/${appointment.id}`, appointment)
  }

  /** Get appointment by ID */
  getAppointmentById(id: string ): Observable<AppointmentData> {
    return this.http.get<AppointmentData>(`${this.apiUrl}/${id}`);
  }


  /** Download of the report (blob) */
  downloadReport(appointmentId: number) {
    // L'URL dipenderà da come il tuo compagno ha chiamato la rotta (es. /appointment/2/download)
    const url = `${this.apiUrl}/${appointmentId}/download`; 
    
    // Il trucco è dire ad Angular che la risposta è un 'blob' (un file binario)
    return this.http.get(url, { responseType: 'blob' });
  }
}
