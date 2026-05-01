import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../shared/components/header/header';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, Header, CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  
  userData = {
    name: '',
    surname: '',
    birthDate: { dd: '', mm: '', yyyy: '' },
    birthPlace: '',
    nationality: '',
    address: '',
    postalCode: 0,
    city: '',
    country: '',
    idDocument: '',
    idIssuingCountry: '',
    idExpiry: { dd: '', mm: '', yyyy: '' },
    sanitaryDocument: '',
    sanitaryIssuingCountry: '',
    sanitaryExpiry: { dd: '', mm: '', yyyy: '' },
    phonePrefix: '+34',
    phoneNumber: 0,
    email: '',
    password: ''
  };

  constructor(private patientService: PatientService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadPatientData();
  }

  loadPatientData(): void {
    const patientId = localStorage.getItem('identity_document'); 

    if (patientId) {
      this.patientService.getPatient(patientId).subscribe({
        next: (data: any) => {
          this.userData = {
            ...this.userData,
            name: data.name || null,
            surname: data.surname || null,
            idDocument: data.identity_document,
            idIssuingCountry: data.identity_document_country || null,
            email: data.mail,
            phoneNumber: data.phone_number,
            password: data.password, 
            idExpiry: this.parseDate(data.identity_document_expire),
            sanitaryDocument: data.sanitary_document,
            sanitaryIssuingCountry: data.sanitary_document_country || null,
            sanitaryExpiry: this.parseDate(data.sanitary_document_expire),
            birthPlace: data.birth_country || null,
            nationality: data.nationality || null,
            address: data.address || null,
            postalCode: data.postal_code || null,
            city: data.city || null,
            country: data.country || null,
            birthDate: this.parseDate(data.birth_date) || null
          };
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar paciente:', err)
      });
    }
  }

  private parseDate(dateStr: any) {
    if (!dateStr || dateStr === "null") return { dd: '', mm: '', yyyy: '' };
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { dd: '', mm: '', yyyy: '' };
    return {
      dd: String(d.getDate()).padStart(2, '0'),
      mm: String(d.getMonth() + 1).padStart(2, '0'),
      yyyy: d.getFullYear().toString()
    };
  }

  saveProfile(): void {
    const validDate = (d: any) => (d.yyyy && d.mm && d.dd) ? `${d.yyyy}-${d.mm}-${d.dd}` : null;

    const patientToUpdate: any = {
      identity_document: this.userData.idDocument,
      identity_document_expire: validDate(this.userData.idExpiry),
      sanitary_document: this.userData.sanitaryDocument,
      sanitary_document_expire: validDate(this.userData.sanitaryExpiry),
      phone_number: Number(this.userData.phoneNumber),
      mail: this.userData.email,
      password: this.userData.password,
      identity_document_country: this.userData.idIssuingCountry || null,
      sanitary_document_country: this.userData.sanitaryIssuingCountry || null,
      name: this.userData.name || null,
      surname: this.userData.surname || null,
      birth_date: validDate(this.userData.birthDate) || null,
      birth_country: this.userData.birthPlace || null,
      nationality: this.userData.nationality || null,
      address: this.userData.address || null,
      postal_code: this.userData.postalCode || null,
      city: this.userData.city || null,
      country: this.userData.country || null  
    };
    localStorage.setItem('patient_name', this.userData.name);

    this.patientService.updatePatient(patientToUpdate).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);
    
        Swal.fire({
          title: '¡Updated!',
          text: 'Your profile has been saved successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          timer: 2500,
          timerProgressBar: true
        });
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        Swal.fire({
          title: 'Error saving',
          text: 'The data could not be synchronized. Please check your profile',
          icon: 'error',
          confirmButtonText: 'Done',
          confirmButtonColor: '#e74c3c'
        });
      }
    });
  }
}