import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../../components/search-bar/search-bar';
import { AppointmentData } from '../../components/appointment/appointmentData';
import { AppointmentGrid } from '../../components/appointment-grid/appointment-grid';
import { Header } from '../../components/header/header';
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../services/appointment-service';
import { AppointmentData as BackendAppointmentData } from '../../../model/appointment';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [SearchBar, AppointmentGrid, Header, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  appointments: AppointmentData[] = [];
  departments: string[] = [];

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
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
        this.appointments = data.map((appointment) =>
          this.mapAppointmentToCard(appointment, false)
        );
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
      },
      error: (err) => {
        console.error('Error loading patient appointments', err);
      }
    });
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
}