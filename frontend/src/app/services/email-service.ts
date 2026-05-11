import { Injectable } from '@angular/core';
import { Email } from '../model/email';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private apiUrl = 'http://127.0.0.1:8000/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(email: Email): Observable<any> {
    return this.http.post<any>(this.apiUrl, email);
  }
}
