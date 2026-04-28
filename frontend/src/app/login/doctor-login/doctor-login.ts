import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-doctor-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './doctor-login.html',
  styleUrl: './doctor-login.css',
})
export class DoctorLogin {
  public loginErrorMessage: string = "";

  loginData = {
    credentials: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const url = 'http://127.0.0.1:8000/login/doctor-log-in'; 

    this.http.post(url, this.loginData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          localStorage.setItem('doctor_surname', response.doctor.surname);
          localStorage.setItem('credentials', response.doctor.credentials);
          this.router.navigate(['/doctor/home']); 
        } else {
          this.loginErrorMessage = "The data provided is invalid.";
        }
      },
      error: (err) => {
        console.error('Connection error', err);
        alert('Unable to connect to the server');
      }
    });
  }
}