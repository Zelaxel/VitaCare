import { Component,ChangeDetectorRef } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { AppointmentData } from '../../components/appointment/appointmentData';
import { AppointmentGrid } from '../../components/appointment-grid/appointment-grid';
import { Header } from '../../components/header/header';
import { Router, RouterLink } from "@angular/router";
import { AppointmentService } from '../../../services/appointment-service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [SearchBar, AppointmentGrid, Header, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  allAppointments: AppointmentData[] = []; //real appointment grid
  appointments: AppointmentData[] = []; //list we use for the filter
  departments: string[] = ['Cardiology', 'Neurology', 'Pediatrics', 'Laboratory', 'General']; //test
  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef
  ) {}
  
  isPatient(): boolean {
    return this.router.url.includes('/patient/home');
  }
  ngOnInit() {
    const userID = this.isPatient() 
      ? localStorage.getItem('identity_document') 
      : localStorage.getItem('credentials');
      if (!userID) {
      console.error("No user found!");
      return; 
    }

    if (this.isPatient()) {
      // if patient 
      this.appointmentService.getAppointmentByPatient(userID).subscribe((data: any[]) => {
        console.log("apoointment", data);
        const datosgrafica = data.map(visit => ({
          ...visit,
          doctorName: visit.doctorName || 'Doctor', 
          doctorIcon: visit.doctorIcon || '👤',
          patientName: visit.patientName || 'Patient',
          patientIcon: visit.patientIcon || '👤',
          date: visit.attendance_date,
          description: visit.reason
        }));
        this.allAppointments = datosgrafica; 
        this.appointments = datosgrafica;
        this.cdr.detectChanges();
      });
    } else {
      // if doctor
      this.appointmentService.getAppointmentByDoctor(userID).subscribe((data: any[]) => {
        console.log("appointment", data);
        const datosgrafica = data.map(visit => ({
          ...visit, 
          doctorName: visit.doctorName || 'Doctor', 
          doctorIcon: visit.doctorIcon || '👤',
          patientName: visit.patientName || 'Patient',
          patientIcon: visit.patientIcon || '👤',
          date: visit.attendance_date,
          description: visit.reason
          
        }));
        this.allAppointments = datosgrafica; 
        this.appointments = datosgrafica;    
        this.cdr.detectChanges();
      });
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
  loadDepartments() {
    //department logic
  }

  handleCreateAppointment() {
    this.router.navigate(['/patient/create-appointment']);
  }
}
  

