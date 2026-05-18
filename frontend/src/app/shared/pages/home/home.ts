import { Component,ChangeDetectorRef } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { AppointmentData } from '../../components/appointment/appointmentData';
import { AppointmentGrid } from '../../components/appointment-grid/appointment-grid';
import { Header } from '../../components/header/header';
import { Router } from "@angular/router";
import { AppointmentService } from '../../../services/appointment-service';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient-service';
import { AppointmentData as BackendAppointmentData } from '../../../model/appointment';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../services/doctor-service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [SearchBar, AppointmentGrid, Header, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  allAppointments: AppointmentData[] = []; //real appointment grid
  appointments: AppointmentData[] = []; //list we use for the filter
  departments: string[] = ['Cardiology', 'Neurology', 'Pediatrics', 'Laboratory', 'General']; //test
  patientData: any = null;
  startRange = '';
  finishRange = '';
  
  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) {}
  
  isPatient(): boolean {
    return this.router.url.startsWith('/patient/home');
  }

  ngOnInit(): void {
    if (!this.isPatient()) {
      this.loadDoctorAppointments();
    }

    if (this.isPatient()) {
      this.loadPatientAppointments();
      this.loadDepartments();
      this.checkPatientProfile();
    }
  }
  
  refreshAppointments() {
    if (this.isPatient()) {
      this.checkPatientProfile();
      this.loadPatientAppointments();
    } else {
      this.loadDoctorAppointments();
    }
    this.cdr.detectChanges();
  }

  async loadDoctorAppointments(): Promise<void> {
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

    this.appointmentService.getAppointmentByDoctor(doctorId).subscribe({
      next: async (data: BackendAppointmentData[]) => {
        const sortedData = this.sortAppointments(data);
        const mappedData = await Promise.all(sortedData.map((appointment) => this.mapAppointmentToCard(appointment, true)));
        this.allAppointments = mappedData;
        this.appointments = mappedData;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading doctor appointments', err);
      }
    });
  }

  async loadPatientAppointments(): Promise<void> {
    const patientId = localStorage.getItem('identity_document');

    if (!patientId) {
      console.error('Patient identity document not found');
      return;
    }

    this.appointmentService.getAppointmentByPatient(patientId).subscribe({
      next: async (data: BackendAppointmentData[]) => {
        const sortedData = this.sortAppointments(data);
        const mappedData = await Promise.all(sortedData.map((appointment) => this.mapAppointmentToCard(appointment, true)));
        this.allAppointments = mappedData;
        this.appointments = mappedData;
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
    
  onSearch(SearchedText: string) {
    // empty text
    if (!SearchedText) {
      this.appointments = [...this.allAppointments]; 
      return; 
    }
    this.appointments = this.allAppointments.filter(visit => {
      const titleMatch = visit.title.toLowerCase().includes(SearchedText);
      return titleMatch;
    });
  } 
  
  filterByDateRange(): void {

    if (!this.startRange || !this.finishRange) {
      alert('Please select both start and finish date.');
      return;
    }

    const start = new Date(this.startRange);
    start.setHours(0, 0, 0, 0);
    
    const finish = new Date(this.finishRange);
    finish.setHours(23, 59, 59, 999);

    this.appointments = this.allAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0, 0, 0, 0);

      return appointmentDate >= start && appointmentDate <= finish;
    });

    this.cdr.detectChanges();
  }

  clearDateFilter(): void {
    this.startRange = '';
    this.finishRange = '';
    this.appointments = [...this.allAppointments];
    this.cdr.detectChanges();
  }
  private async mapAppointmentToCard( appointment: BackendAppointmentData, patientLayout: boolean): Promise<AppointmentData> {
    const doctor = await firstValueFrom(this.doctorService.getDoctor(appointment.id_doctor));
    const patient = await firstValueFrom(this.patientService.getPatient(appointment.id_patient));
    return {
      id: appointment.id ?? 0,
      id_patient: appointment.id_patient,
      id_doctor: appointment.id_doctor,
      title: appointment.title,
      doctorName: doctor.name,
      doctorIcon: '🩺',
      patientName: patient.name || '',
      patientIcon: '👤',
      description: appointment.reason,
      date: appointment.attendance_date,
      department: appointment.department,
      active: appointment.active,
    };
  }
  startDate: string = '';
  endDate: string = '';
  applyDateFilter() {
  
    if (!this.startDate && !this.endDate) {
      this.appointments = [...this.allAppointments];
      return;
    }
    this.appointments = this.allAppointments.filter(visit => {
      const visitDate = new Date(visit.date);
      
      let matchesStart = true;
      let matchesEnd = true;

      if (this.startDate) {
        const start = new Date(this.startDate);
        start.setHours(0, 0, 0, 0); 
        matchesStart = visitDate >= start;
      }

      
      if (this.endDate) {
        const end = new Date(this.endDate);
        end.setHours(23, 59, 59, 999); 
        matchesEnd = visitDate <= end;
      }

      return matchesStart && matchesEnd;
    });
  }

  
  clearFilters() {
    this.startDate = '';
    this.endDate = '';
    this.appointments = [...this.allAppointments];
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
   loadDepartments() {
    fetch('http://localhost:8000/departments')
      .then(res => res.json())
      .then(data => {
        this.departments = data;
        this.cdr.detectChanges();
      });
  }
}
  