import { Component, OnInit } from '@angular/core';
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
  imports: [SearchBar, AppointmentGrid, Header, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  appointments: AppointmentData[] = [];

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
        this.appointments = data.map((appointment) => ({
          id: appointment.id ?? 0,
          title: appointment.title,
          doctorName: appointment.id_doctor,
          doctorIcon: '🩺',
          patientName: appointment.id_patient,
          patientIcon: '👤',
          description: appointment.reason,
          date: new Date(appointment.attendance_date).toLocaleDateString(),
          department: appointment.department,
          active: true,
          patientLayout: false
        }));

        console.log('Doctor appointments:', this.appointments);
      },
      error: (err) => {
        console.error('Error loading doctor appointments', err);
      }
    });
  }
}