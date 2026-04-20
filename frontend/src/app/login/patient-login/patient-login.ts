import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-patient-login',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './patient-login.html',
  styleUrl: './patient-login.css',
})
export class PatientLogin {
  public id: string = "";
  public password: string = "";
  private idRegex: RegExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
  private passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  public loginErrorMessage: string = "";

  loginData = {
    identity_document: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router){}

  onLogin() {
    const url = 'http://localhost:8000/login/log-in'; 

    this.http.post(url, this.loginData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          localStorage.setItem('identity_document', response.patient.identity_document);
          this.router.navigate(['/patient/home']); 
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
