import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [SearchBar, AppointmentGrid, Header, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  appointments: AppointmentData[] = [];
  allAppointments: AppointmentData[] = [];

  startRange = '';
  finishRange = '';

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
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
    }
  }

  loadDoctorAppointments(): void {
    const doctorSurname = localStorage.getItem('doctor_surname');

    if (!doctorSurname) {
      console.error('Doctor surname not found');
      return;
    }

    this.appointmentService.getAppointmentByDoctor(doctorSurname).subscribe({
      next: (data: BackendAppointmentData[]) => {
        this.allAppointments = data.map((appointment) =>
          this.mapAppointmentToCard(appointment, false)
        );

        this.appointments = this.allAppointments;
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
        this.allAppointments = data.map((appointment) =>
          this.mapAppointmentToCard(appointment, true)
        );

        this.appointments = this.allAppointments;
      },
      error: (err) => {
        console.error('Error loading patient appointments', err);
      }
    });
  }

  filterByDateRange(): void {
    if (!this.startRange || !this.finishRange) {
      alert('Please select both start and finish date.');
      return;
    }

    const start = new Date(this.startRange);
    const finish = new Date(this.finishRange);
    finish.setHours(23, 59, 59, 999);

    this.appointments = this.allAppointments.filter((appointment) => {
      const appointmentDate = this.parseAppointmentDate(appointment.date);
      return appointmentDate >= start && appointmentDate <= finish;
    });
  }

  clearDateFilter(): void {
    this.startRange = '';
    this.finishRange = '';
    this.appointments = this.allAppointments;
  }

  private formatDateForDisplay(date: Date | string): string {
    return new Date(date).toLocaleDateString('it-IT');
  }

  private parseAppointmentDate(date: string): Date {
    const parts = date.split('/');

    if (parts.length === 3) {
      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const year = Number(parts[2]);

      return new Date(year, month, day);
    }

    return new Date(date);
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
      date: this.formatDateForDisplay(appointment.attendance_date),
      department: appointment.department,
      active: true,
    };
  }
}