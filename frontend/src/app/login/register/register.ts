import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public id: string = "";
  public calendarValue: string = "";
  public email: string = "";
  public telephoneNumber: string = ""; 
  public healthCardNumber: string = "";
  public password: string = "";
  public confirmPassword: string = "";
  private idRegex: RegExp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
  private passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  private emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.(com)$/;
  private healthCardRegex: RegExp = /^[A-Z]{2,4}[0-9]{8,12}$/;
  public loginErrorMessage: string = "";

  constructor(private router: Router, private patientService: PatientService){}

  public touchedFields: { [key: string]: boolean } = {
    id: false,
    email: false,
    telephone: false,
    card: false,
    password: false,
    confirmPassword: false,
    date: false
  };

  get isIdInvalid(): boolean {
    return this.touchedFields['id'] && (!this.idRegex.test(this.id.toUpperCase()) || this.id === "");
  }

  get isDateInvalid(): boolean {
    return this.touchedFields['date'] && !this.calendarValue;
  }


  get isEmailInvalid(): boolean {
    return this.touchedFields['email'] && (!this.emailRegex.test(this.email) || this.email === "");
  }

  get isTelephoneInvalid(): boolean {
    if (!this.touchedFields['telephone']) return false;

    const rawNumbers = this.telephoneNumber.replace('+34', '').replace(/\s/g, '');
    const digitRegex = /^[0-9]{9}$/;

    return rawNumbers === "" || !digitRegex.test(rawNumbers);
  }

  get isCardInvalid(): boolean {
    return this.touchedFields['card'] && (!this.healthCardRegex.test(this.healthCardNumber.toUpperCase()) || this.healthCardNumber === "");
  }

  get isPasswordInvalid(): boolean {
    return this.touchedFields['password'] && !this.passwordRegex.test(this.password);
  }

  get isConfirmPasswordInvalid(): boolean {
    return this.touchedFields['confirmPassword'] && (this.password !== this.confirmPassword);
  }
  

  onlyNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  formatTelephone(event: any) {
    let input = event.target.value;

    if (!input.startsWith('+34 ')) {
      input = '+34 ' + input.replace(/^\+34\s*/, '');
    }

    const prefix = "+34 ";
    const numbersOnly = input.substring(prefix.length).replace(/\D/g, '');
    const formattedNumbers = numbersOnly.replace(/(\d{3})(?=\d)/g, '$1 ');

    this.telephoneNumber = prefix + formattedNumbers;
    event.target.value = this.telephoneNumber;
  }

  markAsTouched(field: string): void {
    this.touchedFields[field] = true;
  }

  onCalendarChange(event: any): void {
    this.calendarValue = event.target.value; 
    this.markAsTouched('date');
  }

  onRegister() {
  // Marcar todo como tocado para mostrar errores si los hay
  Object.keys(this.touchedFields).forEach(key => this.touchedFields[key] = true);

  const isFormValid = 
    !this.isIdInvalid && 
    !this.isDateInvalid &&
    !this.isEmailInvalid &&
    !this.isTelephoneInvalid &&
    !this.isCardInvalid &&
    !this.isPasswordInvalid && 
    !this.isConfirmPasswordInvalid && 
    this.password !== "";

  if (isFormValid) {
    const cleanPhone = parseInt(this.telephoneNumber.replace('+34', '').replace(/\s/g, ''));

    const newPatient = {
      identity_document: this.id.toUpperCase(),
      identity_document_expire: this.calendarValue,
      sanitary_document: this.healthCardNumber.toUpperCase(),
      sanitary_document_expire: "2045-01-01",
      phone_number: cleanPhone,
      mail: this.email,
      password: this.password
    };

    this.patientService.createPatient(newPatient as any).subscribe({
      next: (response) => {
        this.router.navigate(['/login/log-in']);
      },
      error: (err) => {
        console.error('Server error', err);
        this.loginErrorMessage = err.error?.detail || "Error connecting to the server.";
        setTimeout(() => this.loginErrorMessage = "", 5000);
      }
    });

    } else {
      this.loginErrorMessage = "Please complete all fields correctly.";
      setTimeout(() => this.loginErrorMessage = "", 5000);
    }
  }
}
