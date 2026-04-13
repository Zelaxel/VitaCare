import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../shared/components/header/header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule, Header, CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  // Dati iniziali (da caricare poi via API)
  userData = {
    name: 'John',
    surname: 'Doe',
    birthDate: { dd: '01', mm: '01', yyyy: '1990' },
    birthPlace: 'London',
    nationality: 'British',
    address: 'Baker Street',
    addressNo: '221B',
    postalCode: 'NW1 6XE',
    city: 'London',
    country: 'United Kingdom',
    idDocument: '123456789',
    idIssuingCountry: 'UK',
    idExpiry: { dd: '01', mm: '01', yyyy: '2030' },
    sanitaryDocument: 'SAN-987654',
    sanitaryIssuingCountry: 'UK',
    sanitaryExpiry: { dd: '01', mm: '01', yyyy: '2030' },
    phonePrefix: '+44',
    phoneNumber: '789456123',
    email: 'john.doe@example.com'
  };

  saveProfile(): void {
    console.log('Saving updated profile:', this.userData);
    // Qui andrà la logica per inviare i dati al database
    alert('Profile updated successfully!');
  }}
