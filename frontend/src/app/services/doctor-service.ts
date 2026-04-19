import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../model/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {

  private apiUrl = 'http://127.0.0.1:8000/doctor';

  constructor(private http: HttpClient) {}

  /** Get doctor information by credentials */
  getDoctor(credentials: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${credentials}`);
  }
}
