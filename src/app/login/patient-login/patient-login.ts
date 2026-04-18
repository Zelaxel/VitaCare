import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router){}

  get isIdInvalid(): boolean {
    return this.id.length > 0 && !this.idRegex.test(this.id.toUpperCase());
  }

  get isPasswordInvalid(): boolean {
    return this.password.length > 0 && !this.passwordRegex.test(this.password);
  }

  onLogin(){
    this.loginErrorMessage = "";
    if (this.idRegex.test(this.id) && this.passwordRegex.test(this.password)) {
      this.router.navigate(['/patient']);
    } else {
      this.loginErrorMessage = "The data provided is invalid. Please check the fields in red.";
      setTimeout(() => this.loginErrorMessage = "", 5000);
    }
  }
} 
