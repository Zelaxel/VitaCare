import { Injectable } from '@angular/core';
import { AppointmentData } from '../model/appointment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/appointment';

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
  getAppointmentById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**    added method */
  downloadReport(id: string | number): Observable<any> {
    
    return this.http.get(`${this.apiUrl}/${id}/report`, { responseType: 'blob' });
  }
}
