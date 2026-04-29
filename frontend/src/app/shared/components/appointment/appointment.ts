import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DoctorService } from '../../../services/doctor-service';
import { Doctor } from '../../../model/doctor';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment implements OnInit { // Implementamos OnInit
  @Input() id!: number;
  @Input() id_patient!: string;
  @Input() id_doctor!: string; 
  @Input() title!: string;
  @Input() doctorIcon!: string;
  @Input() patientName!: string;
  @Input() patientIcon!: string;
  @Input() description!: string;
  @Input() date!: string;
  @Input() department!: string;
  @Input() active!: boolean;
  @Input() patientLayaut!: boolean;
  
  public displayDoctorName: string = '';

  constructor(
    private router: Router,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.loadDoctorData();
  }

  private loadDoctorData(): void {
    if (this.id_doctor) {
      this.doctorService.getDoctor(this.id_doctor).subscribe({
        next: (doctor: Doctor) => {
          const surname = doctor.surname.split(' ').pop();
          this.displayDoctorName = `Dr. ${surname}`;
        },
        error: (err) => {
          console.error('Error fetching doctor:', err);
          this.displayDoctorName = 'Unknown Doctor';
        }
      });
    }
  }

  isPatient(): boolean {
    return this.router.url.includes('/patient/home');
  }
}