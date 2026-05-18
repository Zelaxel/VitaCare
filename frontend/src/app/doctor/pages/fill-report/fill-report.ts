import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../../shared/components/header/header';

// Assicurati di usare i percorsi corretti per i tuoi import
import { AppointmentService } from '../../../services/appointment-service'; 
import { PatientService } from '../../../services/patient-service';
import { DoctorService } from '../../../services/doctor-service';
import { AppointmentData } from '../../../model/appointment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fill-report',
  standalone: true,
  imports: [FormsModule, Header, DatePipe],
  templateUrl: './fill-report.html',
  styleUrl: './fill-report.css',
})
  export class FillReport implements OnInit {
  // DICHIARAZIONE DELLE PROPRIETÀ (Risolve l'errore "non esiste")
  id?: number; 
  currentAppointment!: AppointmentData;

  patientName: string = 'Caricamento...'; 
  doctorName: string = 'Caricamento...';
  date: Date | undefined;
  department: string = '';
  reason: string = 'Caricamento...'; 
  conclusion: string = ''; 
  paid: boolean = true;
  price: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private location: Location,
    private patientService: PatientService, // Serviranno se ricarichi la pagina (F5)
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as any;

    if (state) {
      // 1. Salviamo l'ID locale
      this.id = state.id;
      
      // 2. Popoliamo le variabili per l'HTML
      this.patientName = state.patientName;
      this.doctorName = state.doctorName;
      this.department = state.department;
      this.reason = state.description; 
      
      // Convertiamo la data dello state in oggetto Date per la Pipe
      if (state.date) {
        this.date = new Date(state.date);
      }

      // 3. COSTRUIAMO L'OGGETTO PER IL SUBMIT
      // Questo è fondamentale affinché updateAppointment() funzioni
      this.currentAppointment = {
        id: state.id,
        id_patient: state.id_patient,
        id_doctor: state.id_doctor,
        title: state.title,
        department: state.department,
        attendance_date: this.date as Date,
        reason: state.description,
        conclusion: state.conclusion || '',
        active: state.active,
        paid: state.paid !== undefined ? state.paid : true,
        price: state.price || 0
      };
    }
  }

  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    if (appointmentId) {
      // Chiamiamo il servizio ogni volta che entriamo nella pagina
      this.loadAppointmentData(appointmentId);
    }
  }

  loadAppointmentData(id: string): void {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment) => {
        this.currentAppointment = appointment;
        
        this.date = new Date(appointment.attendance_date); 
        this.reason = appointment.reason;
        this.conclusion = appointment.conclusion || '';
        this.paid = appointment.paid;
        this.price = appointment.price || 0;
        
        // Aggiorniamo la UI per i dati base
        this.cdr.detectChanges();

        this.patientService.getPatient(appointment.id_patient).subscribe({
          next: (patient) => {
            this.patientName = `${patient.name} ${patient.surname}`;
            // AGGIUNTA FONDAMENTALE: Avvisa Angular che il nome paziente è arrivato
            this.cdr.detectChanges(); 
          },
          error: (err) => console.error('Error fetching patient data', err)
        });

        this.doctorService.getDoctor(appointment.id_doctor).subscribe({
          next: (doctor) => {
            this.doctorName = `Dr. ${doctor.name} ${doctor.surname}`;
            this.department = doctor.department;
            // AGGIUNTA FONDAMENTALE: Avvisa Angular che i dati del dottore sono arrivati
            this.cdr.detectChanges(); 
          },
          error: (err) => console.error('Error fetching doctor data', err)
        });
      },
      error: (err) => {
        console.error('Error loading appointment details', err);
        Swal.fire({
          icon: 'error',
          title: 'Data Load Failed',
          text: 'Could not retrieve appointment details. Please try again later.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  goBack(): void {
    // Torna alla pagina precedente tramite il routing di Angular
    this.location.back();
  }

  submitReport(): void {
    if (!this.conclusion.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please enter a conclusion before submitting the report.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    this.currentAppointment.conclusion = this.conclusion;
    this.currentAppointment.active = false;
    this.currentAppointment.paid = this.paid;
    this.currentAppointment.price = this.paid ? 0 : this.price;

    this.appointmentService.updateAppointment(this.currentAppointment).subscribe({
      next: (updatedAppointment) => {
        console.log('Report successfully saved:', updatedAppointment);
        
        Swal.fire({
          icon: 'success',
          title: 'Report Approved',
          text: 'The resolution has been successfully submitted.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.goBack();
        });
      },
      error: (err) => {
        console.error('Error during saving process', err);
        Swal.fire({
          icon: 'error',
          title: 'Submission Error',
          text: 'An error occurred while saving the report. Please check your connection.',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }
}