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
import { EmailService } from '../../../services/email-service';
import { Email } from '../../../model/email';
import { PatientService } from '../../../services/patient-service';
import { Patient } from '../../../model/patient';
import { email } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { formatDate } from '@angular/common';

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
      private http: HttpClient,
      private route: ActivatedRoute,
      private emailService: EmailService,
      private patientService: PatientService
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
        this.event_id = data.event_id;
        
        const dt = new Date(data.attendance_date);
        this.date = dt.toISOString().split('T')[0];
        this.time = dt.toTimeString().substring(0, 5);
        
        this.cdr.detectChanges();
      }
    });
  }

  async updateAppointment(): Promise<void> {
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
      paid: false
    };

    const tomorrow = new Date();
    tomorrow.setHours(0,0,0,0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Previous date
    if(new Date(this.date).getTime() < tomorrow.getTime()) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'Appointments must be scheduled at least one day in advance. Same-day bookings are not available. Please select tomorrow or a later date.',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    // Sunday date
    if(new Date(this.date).getDay() === 0) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'The medical center is closed on Sundays. Please schedule your appointment for a business day (Monday through Saturday).',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    const patient_disponibility: boolean = await firstValueFrom(this.patientService.checkDisponibility(localStorage.getItem('identity_document')!, fullDateTime));

    // Patient not aviable.
    if(patient_disponibility === false) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'The patient already has another appointment scheduled for this date and time. Please choose a different date.',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    const doctor_disponibility: boolean = await firstValueFrom(this.doctorService.checkDisponibility(this.doctor, fullDateTime));

    // Doctor not aviable.
    if(doctor_disponibility! === false) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'The doctor already has another appointment scheduled for this date and time. Please choose a different date.',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    this.appointmentService.updateAppointment(updatedAppointment).subscribe({
      next: () => {
        Swal.fire(
          'Updated!',
          'The appointment has been successfully modified.',
          'success'
        ).then(() => {this.navigateHome();});
      }, error: (err) => {
        console.error('Error al actualizar', err)}
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
      this.doctors = data;
      this.doctor = '';
      this.cdr.detectChanges();
    });
  }

  async createAppointment(): Promise<void> {
    const patientId = localStorage.getItem('identity_document');

    if (!patientId) {
      alert(
        'Patient not found. Please login again.'
      );
      return;
    }

    if (
      !this.department ||
      !this.doctor ||
      !this.date ||
      !this.time ||
      !this.medicalMatter ||
      !this.explanation
    ) {
      this.loginErrorMessage =
        "Some fields are missing.";

      return;
    }

    const fullDateTime: string =
      `${this.date}T${this.time}:00`;

    const generatedEventId = crypto.randomUUID();
    const tomorrow = new Date();
    tomorrow.setHours(0,0,0,0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Previous date
    if(new Date(this.date).getTime() < tomorrow.getTime()) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'Appointments must be scheduled at least one day in advance. Same-day bookings are not available. Please select tomorrow or a later date.',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    // Sunday date
    if(new Date(this.date).getDay() === 0) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'The medical center is closed on Sundays. Please schedule your appointment for a business day (Monday through Saturday).',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    const patient_disponibility: boolean = await firstValueFrom(this.patientService.checkDisponibility(patientId, fullDateTime));

    // Patient not aviable.
    if(patient_disponibility === false) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'The patient already has another appointment scheduled for this date and time. Please choose a different date.',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    const doctor_disponibility: boolean = await firstValueFrom(this.doctorService.checkDisponibility(this.doctor, fullDateTime));

    // Doctor not aviable.
    if(doctor_disponibility! === false) {
      Swal.fire({
          title: 'Schedule Conflict',
          text: 'The doctor already has another appointment scheduled for this date and time. Please choose a different date.',
          icon: 'error',
          showConfirmButton: true
      });
      return;
    }

    const appointment: AppointmentData = {
      id_patient: patientId,
      id_doctor: this.doctor,
      title: this.medicalMatter,
      department: this.department,
      attendance_date:
        fullDateTime as any,
      reason: this.explanation,
      active: true,
      paid: false,
      event_id: generatedEventId
    };

    const snapshot = {
      date: this.date,
      time: this.time,
      medicalMatter:
        this.medicalMatter,
      explanation:
        this.explanation,
      department: this.department,
      doctor: this.doctor
    };

    // 1. GUARDAMOS EN BD
    this.appointmentService
      .createAppointment(appointment)
      .subscribe({

        next: () => {

          const identityDocument =
            localStorage.getItem(
              'identity_document'
            );

          if (!identityDocument) {

            Swal.fire({
              title: '¡Created!',
              text:
                'The appointment has been scheduled successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() =>
              this.navigateHome()
            );

            return;
          }

          const cronofyRaw =
            localStorage.getItem(
              `cronofy_${identityDocument}`
            );

          // Si el usuario NO tiene Cronofy
          // simplemente terminamos
          if (!cronofyRaw) {

            Swal.fire({
              title: '¡Created!',
              text:
                'The appointment has been scheduled successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() =>
              this.navigateHome()
            );

            return;
          }

          const cronofyData =
            JSON.parse(cronofyRaw);

          const token =
            cronofyData.access_token;

          if (!token) {
            return;
          }

          const savedCalendarId =
            localStorage.getItem(
              `cronofy_calendar_${identityDocument}`
            );

          // SI YA TENEMOS CALENDAR_ID
          if (savedCalendarId) {

            this.sendEventToCronofy(
              token,
              savedCalendarId,
              patientId,
              snapshot,
              generatedEventId
            );

          } else {

            // SI NO TENEMOS CALENDAR_ID
            // LO PEDIMOS
            this.http.get<any>(
              `http://localhost:8000/cronofy/calendars?token=${token}`
            ).subscribe({

              next: (res) => {

                const calendarId =
                  res.calendars[0]
                    .calendar_id;

                localStorage.setItem(
                  `cronofy_calendar_${identityDocument}`,
                  calendarId
                );

                this.sendEventToCronofy(
                  token,
                  calendarId,
                  patientId,
                  snapshot,
                  generatedEventId
                );
              },

              error: (err) => {

                console.error(
                  'Error obtaining calendars',
                  err
                );
              }
            });
          }

          Swal.fire({
            title: '¡Created!',
            text:
              'The appointment has been scheduled successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() =>
            this.navigateHome()
          );

          this.resetForm();
        },

        error: (err) => {

          console.error(
            'Error creating appointment',
            err
          );

          alert(
            'Unable to create appointment.'
          );
        }
      });
      this.notifyDoctor(appointment);
      this.notifyPatient(appointment);
  }

 private sendEventToCronofy(
    token: string,
    calendarId: string,
    patientId: string,
    snapshot: any,
    event_id: string
  ) {

    console.log("DATE:", snapshot.date);
    console.log("TIME:", snapshot.time);

    if (!snapshot.date || !snapshot.time) {
      console.error("Date or time missing");
      return;
    }

    const startString =
      `${snapshot.date}T${snapshot.time}`;

    const startLocal =
      new Date(startString);

    if (isNaN(startLocal.getTime())) {
      console.error(
        "Invalid date:",
        startString
      );
      return;
    }

    const endLocal =
      new Date(
        startLocal.getTime() +
        60 * 60 * 1000
      );

    this.http.post(
      'http://localhost:8000/cronofy/create-event',
      {
        token,
        calendar_id: calendarId,

        // IMPORTANTE
        event_id: event_id,

        title:
          `Cita Médica: ${snapshot.medicalMatter}`,

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

        console.log(
          "Evento en Google Calendar OK",
          resp
        );

        this.resetForm();
      },

      error: (err) => {

        console.error(
          "Error en Cronofy",
          err
        );
      }
    });
  }

  async notifyDoctor(appointment: AppointmentData): Promise<void> {
    const doctor: Doctor = await this.getDoctor(appointment.id_doctor);
    const patient: Patient = await this.getPatient(appointment.id_patient);
    const email: Email = {
      email: doctor.mail,
      subject: "Appointment confirmation",
      message: `
                  <h1>You have an appointment</h1>
                  <p>Hello Dr. ${doctor.name}👋!</p>
                  <p>An appointment has been scheduled for you. Please check de information below:</p>
                  <ul>
                    <li>Patient: ${patient.name} ${patient.surname}</li>
                    <li>Department: ${appointment.department}</li>
                    <li>Date: ${formatDate(appointment.attendance_date, 'yyyy-MM-dd : HH:mm', 'en-US')}</li>
                  </ul>
                `
    }
    this.emailService.sendEmail(email).subscribe({});
  }

  async notifyPatient(appointment: AppointmentData): Promise<void> {
    const doctor: Doctor = await this.getDoctor(appointment.id_doctor);
    const patient: Patient = await this.getPatient(appointment.id_patient);
    const email: Email = {
      email: patient.mail,
      subject: "Appointment confirmation",
      message: `
                  <h1>You have an appointment</h1>
                  <p>Hello ${patient.name}👋!</p>
                  <p>An appointment has been scheduled for you. Please check de information below:</p>
                  <ul>
                    <li>Department: ${appointment.department}</li>
                    <li>Specialist: Dr. ${doctor.name} ${doctor.surname}</li>
                    <li>Date: ${formatDate(appointment.attendance_date, 'yyyy-MM-dd : HH:mm', 'en-US')}</li>
                  </ul>
                `
    }
    this.emailService.sendEmail(email).subscribe({});
  }

  async notifyUpdateDoctor(appointment: AppointmentData): Promise<void> {
    const doctor: Doctor = await this.getDoctor(appointment.id_doctor);
    const patient: Patient = await this.getPatient(appointment.id_patient);
    const email: Email = {
      email: doctor.mail,
      subject: "Appointment update",
      message: `
                  <h1>Your appointment has been updated</h1>
                  <p>Hello Dr. ${doctor.name}👋!</p>
                  <p>An appointment has been updated for you. Please check de information below:</p>
                  <ul>
                    <li>Patient: ${patient.name} ${patient.surname}</li>
                    <li>Department: ${appointment.department}</li>
                    <li>Date: ${formatDate(appointment.attendance_date, 'yyyy-MM-dd : HH:mm', 'en-US')}</li>
                  </ul>
                `
    }
    this.emailService.sendEmail(email).subscribe({});
  }

  async notifyUpdatePatient(appointment: AppointmentData): Promise<void> {
    const doctor: Doctor = await this.getDoctor(appointment.id_doctor);
    const patient: Patient = await this.getPatient(appointment.id_patient);
    const email: Email = {
      email: patient.mail,
      subject: "Appointment update",
      message: `
                  <h1>Your appointment has been updated</h1>
                  <p>Hello ${patient.name}👋!</p>
                  <p>An appointment has been updated for you. Please check de information below:</p>
                  <ul>
                    <li>Department: ${appointment.department}</li>
                    <li>Specialist: Dr. ${doctor.name} ${doctor.surname}</li>
                    <li>Date: ${formatDate(appointment.attendance_date, 'yyyy-MM-dd : HH:mm', 'en-US')}</li>
                  </ul>
                `
    }
    this.emailService.sendEmail(email).subscribe({});
  }

  async getDoctor(id: string) {
    return firstValueFrom(this.doctorService.getDoctor(id));
  }

  async getPatient(id: string) {
    return firstValueFrom(this.patientService.getPatient(id));
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
