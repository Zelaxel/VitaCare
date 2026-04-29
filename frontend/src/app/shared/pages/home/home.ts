import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../../components/search-bar/search-bar';
import { AppointmentData } from '../../components/appointment/appointmentData';
import { AppointmentGrid } from '../../components/appointment-grid/appointment-grid';
import { Header } from '../../components/header/header';
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../services/appointment-service';
import { PatientService } from '../../../services/patient-service';
import { AppointmentData as BackendAppointmentData } from '../../../model/appointment';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [SearchBar, AppointmentGrid, Header, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  appointments: AppointmentData[] = [];
  departments: string[] = [];
  patientData: any = null;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private cdr: ChangeDetectorRef
  ) {}

  isPatient(): boolean {
    return this.router.url.includes('/patient/home');
  }

  isDoctor(): boolean {
    return this.router.url.includes('/doctor/home');
  }

  ngOnInit(): void {
    if (this.isDoctor()) {
      this.loadDoctorAppointments();
    }

    if (this.isPatient()) {
      this.loadPatientAppointments();
      this.loadDepartments();
      this.checkPatientProfile();
    }
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

  loadDoctorAppointments(): void {
    const doctorSurname = localStorage.getItem('doctor_surname');
    const doctorId = localStorage.getItem('credentials');

    if (!doctorSurname) {
      console.error('Doctor surname not found');
      return;
    }

    if(!doctorId){
      console.error("doctor id not found");
      return;
    }

    console.log(doctorId);
    this.appointmentService.getAppointmentByDoctor(doctorId).subscribe({
      next: (data: BackendAppointmentData[]) => {
        const sortedData = this.sortAppointments(data);
        this.appointments = data.map((appointment) =>
          this.mapAppointmentToCard(appointment, false)
        );
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading doctor appointments', err);
      }
    });
  }

  loadPatientAppointments(): void {
    const patientId = localStorage.getItem('identity_document');

    if (!patientId) {
      console.error('Patient identity document not found');
      return;
    }

    this.appointmentService.getAppointmentByPatient(patientId).subscribe({
      next: (data: BackendAppointmentData[]) => {
        this.appointments = data.map((appointment) =>
          this.mapAppointmentToCard(appointment, true)
        );
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading patient appointments', err);
      }
    });
  }

  checkPatientProfile(): void {
    const patientId = localStorage.getItem('identity_document');
    if (patientId) {
      this.patientService.getPatient(patientId).subscribe({
        next: (data) => {
          this.patientData = data;
        }
      });
    }
  }

  handleCreateAppointment(): void {
    if (!this.patientData || !this.patientData.name || !this.patientData.surname) {
      Swal.fire({
        title: 'Profile Incomplete',
        text: 'Please complete your name and surname in your profile before requesting an appointment.',
        icon: 'warning',
        confirmButtonText: 'Go to Profile',
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          // Solo redirige cuando el usuario hace clic en el botón
          this.router.navigate(['/patient/user-profile']);
        }
      });
    } else {
      // Si todo está bien, navegar a la creación de cita
      this.router.navigate(['/patient/create-appointment']);
    }
  }

  private mapAppointmentToCard(
    appointment: BackendAppointmentData,
    patientLayout: boolean
  ): AppointmentData {
    return {
      id: appointment.id ?? 0,
      id_patient: appointment.id_patient,
      id_doctor: appointment.id_doctor,
      title: appointment.title,
      doctorName: appointment.id_doctor,
      doctorIcon: '🩺',
      patientName: appointment.id_patient,
      patientIcon: '👤',
      description: appointment.reason,
      date: new Date(appointment.attendance_date).toLocaleDateString(),
      department: appointment.department,
      active: appointment.active,
    };
  }




  private sortAppointments(data: BackendAppointmentData[]): BackendAppointmentData[] {
    return data.sort((a, b) => {
      const timeA = new Date(a.attendance_date).getTime();
      const timeB = new Date(b.attendance_date).getTime();

      const isAActive = a.active;
      const isBActive = b.active;

      // SCENARIO 1: 'a' is active (to do), 'b' is inactive (done) -> 'a' comes first
      if (isAActive && !isBActive) {
        return -1; 
      }
      
      // SCENARIO 2: 'b' is active (to do), 'a' is inactive (done) -> 'b' comes first
      if (!isAActive && isBActive) {
        return 1; 
      }

      // SCENARIO 3: Both appointments are active (To do)
      if (isAActive && isBActive) {
        // ASCENDING ORDER: From the closest upcoming date to the furthest in the future
        return timeA - timeB; 
      } 
      
      // SCENARIO 4: Both appointments are inactive (Done)
      else {
        // DESCENDING ORDER: From the most recently completed to the oldest one
        return timeB - timeA; 
      }
    });
  }
}