import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../components/header/header';
import { DoctorService } from '../../../services/doctor-service';
import { Doctor } from '../../../model/doctor';
import { AppointmentService } from '../../../services/appointment-service';
import { AppointmentData } from '../../../model/appointment';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-attendance-creator',
  imports: [Header, FormsModule, CommonModule],
  templateUrl: './attendance-creator.html',
  styleUrl: './attendance-creator.css',
})
export class AttendanceCreator implements OnInit{
  departments: string[] = [];
  doctors: any[] = [];
  availableHours: string[] = [];
  isEditMode = false;
  currentAppointmentId?: number;

  department = '';
  doctor = '';
  date = '';
  time = '';
  medicalMatter = '';
  explanation = '';
  loginErrorMessage = '';
  notifications = true;

  constructor(private appointmentService: AppointmentService,
      private doctorService: DoctorService,
      private cdr: ChangeDetectorRef,
      private router: Router,
      private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.loadDepartments();
    this.generateHours();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.currentAppointmentId = +id;
      this.loadAppointmentData(id);
    }
  }

  loadAppointmentData(id: string) {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (data) => {
        this.department = data.department; 
        const normalizedDept = this.department.toLowerCase();
        this.doctorService.getDoctorByDepartment(normalizedDept).subscribe(doctorsList => {
          this.doctors = doctorsList;
          this.doctor = data.id_doctor; 
          this.cdr.detectChanges();
        });

        this.medicalMatter = data.title;
        this.explanation = data.reason;
        
        const dt = new Date(data.attendance_date);
        this.date = dt.toISOString().split('T')[0];
        this.time = dt.toTimeString().substring(0, 5);
        
        this.cdr.detectChanges();
      }
    });
  }

  updateAppointment(): void {
    const fullDateTime = `${this.date}T${this.time}:00`;
    
    const updatedAppointment: AppointmentData = {
      id: this.currentAppointmentId,
      id_patient: localStorage.getItem('identity_document')!,
      id_doctor: this.doctor,
      title: this.medicalMatter,
      department: this.department,
      attendance_date: fullDateTime as any,
      reason: this.explanation,
      active: true,
    };

    this.appointmentService.updateAppointment(updatedAppointment).subscribe({
      next: () => {
        Swal.fire('Updated!', 'The appointment has been successfully modified.', 'success')
          .then(() => this.router.navigate(['/patient/home']));
      },
      error: (err) => console.error('Error al actualizar', err)
    });
  }

  saveAppointment(): void {
    if (this.isEditMode) {
      this.updateAppointment();
    } else {
      this.createAppointment();
    }
  }

  generateHours() {
    // Genera strings de "08:00" hasta "20:00"
    for (let h = 8; h <= 20; h++) {
      const hourLabel = h < 10 ? `0${h}:00` : `${h}:00`;
      this.availableHours.push(hourLabel);
    }
  }

  isPatient(): boolean {
    return this.router.url.startsWith('/patient');
  }

  loadDepartments() {
    fetch('http://localhost:8000/departments')
      .then(res => res.json())
      .then(data => {
        console.log("Departments:", data);
        this.departments = data;
        this.cdr.detectChanges();
      });
  }

  loadDoctorsByDepartment() {
  if (!this.department) {
    this.doctors = [];
    this.doctor = '';
    return;
  }

  const normalizedDept = this.department.toLowerCase();

  this.doctorService
    .getDoctorByDepartment(normalizedDept)
    .subscribe(data => {
      console.log("Doctors:", data);
      this.doctors = data;
      this.doctor = '';
      this.cdr.detectChanges();
    });
  }

  createAppointment(): void {
    const patientId = localStorage.getItem('identity_document');

    if (!patientId) {
      alert('Patient not found. Please login again.');
      return;
    }

    if (!this.department || !this.doctor || !this.date || !this.time || !this.medicalMatter || !this.explanation) {
      this.loginErrorMessage = "Some fields are missing."
      return;
    }

    const fullDateTime = `${this.date}T${this.time}:00`;

    const appointment: AppointmentData = {
      id_patient: patientId,
      id_doctor: this.doctor,
      title: this.medicalMatter,
      department: this.department,
      attendance_date: fullDateTime as any,
      reason: this.explanation,
      active: true,
    };

    this.appointmentService.createAppointment(appointment).subscribe({
      next: () => {
          Swal.fire({
          title: '¡Created!',
          text: 'The appointment has been scheduled successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/patient/home']); 
        });
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating appointment', err);
        alert('Unable to create appointment.');
      }
    });
  }

  private formatDate(date: string): string {
    const parts = date.split('/');

    if (parts.length === 3) {
      const month = parts[0].padStart(2, '0');
      const day = parts[1].padStart(2, '0');
      const year = parts[2];

      return `${year}-${month}-${day}`;
    }

  return date;
}

  private resetForm(): void {
    this.department = '';
    this.doctor = '';
    this.date = '';
    this.medicalMatter = '';
    this.explanation = '';
    this.notifications = true;
  }
  
}
