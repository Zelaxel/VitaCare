import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  isCalendarConnected = false;
  event_id: any;

  constructor(private appointmentService: AppointmentService,
      private doctorService: DoctorService,
      private cdr: ChangeDetectorRef,
      private router: Router,
      private route: ActivatedRoute,
      private http: HttpClient
    ) {}

  ngOnInit() {
    this.loadDepartments();
    this.generateHours();
    const identityDocument = localStorage.getItem('identity_document');

    if (identityDocument) {
      this.isCalendarConnected =
        !!localStorage.getItem(
          `cronofy_${identityDocument}`
        );
    }

    const doc = localStorage.getItem('identity_document');
    if (doc && (!localStorage.getItem('currentUser') || localStorage.getItem('currentUser') === 'undefined')) {
      // Usamos tu servicio o un fetch directo para guardar el objeto completo
      this.http.get(`http://localhost:8000/patient/${doc}`).subscribe(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      });
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.currentAppointmentId = +id;
      this.loadAppointmentData(id);
    }
  }

  private navigateHome(): void {
    const targetRoute = this.isPatient() ? '/patient/home' : '/doctor/home';
    this.router.navigate([targetRoute]);
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
      event_id: this.event_id as any,
    };

    this.appointmentService.updateAppointment(updatedAppointment).subscribe({
        next: () => {
          const identityDocument = localStorage.getItem('identity_document');

          if (!identityDocument) {
            return;
          }

          const cronofyRaw = localStorage.getItem(`cronofy_${identityDocument}`);

          if (!cronofyRaw) {
            return;
          }

          const cronofyData = JSON.parse(cronofyRaw);
          const token = cronofyData.access_token;
          const calendarId = localStorage.getItem(`cronofy_calendar_${identityDocument}`);

          if (token && calendarId) {
            this.http.delete(
              `http://localhost:8000/cronofy/delete-event`,
              {
                params: {
                  token: token,
                  calendar_id: calendarId,
                  event_id:
                    (updatedAppointment as any)
                      .event_id
                }
              }
            ).subscribe({
              next: () => {
                const snapshot = {
                  date: this.date,
                  time: this.time,
                  medicalMatter: this.medicalMatter,
                  explanation: this.explanation,
                  department: this.department,
                  doctor: this.doctor,
                  eventId:
                    (updatedAppointment as any)
                      .event_id
                };

                this.sendEventToCronofy(
                  token,
                  calendarId,
                  identityDocument,
                  snapshot
                );
              },

              error: (err) => {
                console.error(
                  "Error deleting old event",
                  err
                );
              }
            });
          }

          Swal.fire(
            'Updated!',
            'The appointment has been successfully modified.',
            'success'
          ).then(() => {

            this.navigateHome();

          });
        },

        error: (err) =>
          console.error(
            'Error al actualizar',
            err
          )
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
    for (let h = 8; h <= 20; h++) {
      const hourLabel = h < 10 ? `0${h}:00` : `${h}:00`;
      this.availableHours.push(hourLabel);
    }
  }

  isPatient(): boolean {
    return this.router.url.includes('/patient');
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
      this.loginErrorMessage = "Some fields are missing.";
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

    const snapshot = {
      date: this.date,
      time: this.time,
      medicalMatter: this.medicalMatter,
      explanation: this.explanation,
      department: this.department,
      doctor: this.doctor
    };

    this.appointmentService.createAppointment(appointment).subscribe({
      next: () => {
        const identityDocument = localStorage.getItem('identity_document');
        if (!identityDocument) return;

        const cronofyRaw = localStorage.getItem(`cronofy_${identityDocument}`);
        if (!cronofyRaw) return;

        const cronofyData = JSON.parse(cronofyRaw);
        const token = cronofyData.access_token;

        if (token) {
          const savedCalendarId = localStorage.getItem(`cronofy_calendar_${identityDocument}`);

          if (savedCalendarId) {
            this.sendEventToCronofy(token, savedCalendarId, patientId, snapshot);
          } else {
            this.http.get<any>(
              `http://localhost:8000/cronofy/calendars?token=${token}`
            ).subscribe({
              next: (res) => {
                const calendarId = res.calendars[0].calendar_id;
                localStorage.setItem(`cronofy_calendar_${identityDocument}`, calendarId);

                this.sendEventToCronofy(token, calendarId, patientId, snapshot);
              }
            });
          }
        }

        Swal.fire({
          title: '¡Created!',
          text: 'The appointment has been scheduled successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => this.navigateHome());
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating appointment', err);
        alert('Unable to create appointment.');
      }
    });
  }

 private sendEventToCronofy(token: string, calendarId: string, patientId: string, snapshot: any) {
    console.log("DATE:", snapshot.date);
    console.log("TIME:", snapshot.time);

    if (!snapshot.date || !snapshot.time) {
      console.error("Date or time missing");
      return;
    }

    const startString = `${snapshot.date}T${snapshot.time}`;
    const startLocal = new Date(startString);

    if (isNaN(startLocal.getTime())) {
      console.error("Invalid date:", startString);
      return;
    }

    const endLocal = new Date(startLocal.getTime() + 60 * 60 * 1000);

    this.http.post(
      'http://localhost:8000/cronofy/create-event',
      {
        token,
        calendar_id: calendarId,
        event_id: crypto.randomUUID(),
        title: `Cita Médica: ${snapshot.medicalMatter}`,
        description:
          `Paciente ID: ${patientId}\n` +
          `Doctor: ${snapshot.doctor}\n` +
          `Departamento: ${snapshot.department}\n` +
          `Motivo: ${snapshot.explanation}`,
        start: startLocal.toISOString(),
        end: endLocal.toISOString()
      }
    ).subscribe({
      next: (resp) => {
        console.log("Evento en Google Calendar OK", resp);
        this.resetForm();
      },
      error: (err) => {
        console.error("Error en Cronofy", err);
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
