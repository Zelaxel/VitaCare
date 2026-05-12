import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CronofyService {
  constructor(private http: HttpClient) {}

  getAuthUrl() {
    return this.http.get<any>(
      'http://localhost:8000/cronofy-auth'
    );
  }
}
