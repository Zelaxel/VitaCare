import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router){}

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
    Object.keys(this.touchedFields).forEach(key => this.touchedFields[key] = true);

    const isFormValid = 
      !this.isIdInvalid && 
      !this.isPasswordInvalid && 
      !this.isConfirmPasswordInvalid && 
      this.password !== "" &&
      this.confirmPassword !== "" &&
      this.password === this.confirmPassword;

    if (isFormValid) {
      this.router.navigate(['/login/log-in']);
    } else {
      this.loginErrorMessage = "Please complete all fields correctly.";
      setTimeout(() => this.loginErrorMessage = "", 5000);
    }
  }
}
