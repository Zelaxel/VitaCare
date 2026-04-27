import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { AppointmentService } from '../../../services/appointment-service';
import { AppointmentData } from '../../../model/appointment';

@Component({
  standalone: true,
  selector: 'app-attendance-creator',
  imports: [Header, FormsModule],
  templateUrl: './attendance-creator.html',
  styleUrl: './attendance-creator.css',
})
export class AttendanceCreator {
  department = '';
  doctor = '';
  date = '';
  medicalMatter = '';
  explanation = '';
  notifications = true;

  constructor(private appointmentService: AppointmentService) {}

  createAppointment(): void {
    const patientId = localStorage.getItem('identity_document');

    if (!patientId) {
      alert('Patient not found. Please login again.');
      return;
    }

    if (!this.department || !this.doctor || !this.date || !this.medicalMatter) {
      alert('Please fill all required fields.');
      return;
    }

    const appointment: AppointmentData = {
      id_patient: patientId,
      id_doctor: this.cleanDoctorName(this.doctor),
      title: this.medicalMatter,
      department: this.department,
      attendance_date: this.formatDate(this.date) as any,
      reason: this.explanation,
    };

    this.appointmentService.createAppointment(appointment).subscribe({
      next: () => {
        alert('Appointment created successfully.');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating appointment', err);
        alert('Unable to create appointment.');
      }
    });
  }

  private cleanDoctorName(doctor: string): string {
    return doctor.replace('Dr. ', '').replace('Dra. ', '');
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
