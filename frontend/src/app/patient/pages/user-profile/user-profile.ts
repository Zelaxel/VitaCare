import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../shared/components/header/header';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient-service';

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
    postalCode: '',
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
            name: data.name || '',
            surname: data.surname || '',
            idDocument: data.identity_document,
            idIssuingCountry: data.identity_document_country || '',
            email: data.mail,
            phoneNumber: data.phone_number,
            password: data.password, 
            idExpiry: this.parseDate(data.identity_document_expire),
            sanitaryDocument: data.sanitary_document,
            sanitaryIssuingCountry: data.sanitary_document_country || '',
            sanitaryExpiry: this.parseDate(data.sanitary_document_expire),
            birthPlace: data.birth_country || '',
            nationality: data.nationality || '',
            address: data.address || '',
            postalCode: data.postal_code || '',
            city: data.city || '',
            country: data.country || '',
            birthDate: this.parseDate(data.birth_date)
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
    const patientToUpdate: any = {
      identity_document: this.userData.idDocument,
      identity_document_expire: `${this.userData.idExpiry.yyyy}-${this.userData.idExpiry.mm}-${this.userData.idExpiry.dd}`,
      sanitary_document: this.userData.sanitaryDocument,
      sanitary_document_expire: `${this.userData.sanitaryExpiry.yyyy}-${this.userData.sanitaryExpiry.mm}-${this.userData.sanitaryExpiry.dd}`,
      phone_number: Number(this.userData.phoneNumber),
      mail: this.userData.email,
      password: this.userData.password,
      identity_document_country: this.userData.idIssuingCountry,
      sanitary_document_country: this.userData.sanitaryIssuingCountry,
      name: this.userData.name,
      surname: this.userData.surname,
      birth_date: `${this.userData.birthDate.yyyy}-${this.userData.birthDate.mm}-${this.userData.birthDate.dd}`,
      birth_country: this.userData.birthPlace,
      nationality: this.userData.nationality,
      address: this.userData.address,
      postal_code: this.userData.postalCode,
      city: this.userData.city,
      country: this.userData.country
    };

    this.patientService.updatePatient(patientToUpdate).subscribe({
      next: (response) => {
        alert('¡Perfil actualizado con éxito!');
        console.log('Respuesta:', response);
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Hubo un error al guardar los cambios.');
      }
    });
  }
}