import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';

import { Header } from '../../components/header/header';
// Controlla che i percorsi siano corretti per il tuo progetto
import { AppointmentService } from '../../../services/appointment-service';
import { PatientService } from '../../../services/patient-service';
import { DoctorService } from '../../../services/doctor-service';

@Component({
  standalone: true,
  selector: 'app-report',
  imports: [Header, DatePipe, TitleCasePipe], 
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report implements OnInit {
  patientName: string = "Caricamento...";
  doctorName: string = "Caricamento...";
  date: Date | string = "";
  department: string = "Caricamento...";
  reason: string = "Caricamento...";
  conclusion: string = "Caricamento...";

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private appointmentService = inject(AppointmentService);
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const state = history.state;

    // 1. Popoliamo subito l'interfaccia con i dati veloci provenienti dallo state (se ci sono)
    // Questo evita di mostrare "Caricamento..." e dà l'impressione di un caricamento istantaneo.
    // (Attenzione: qui il patientName ha solo il nome, senza cognome).
    if (state && state.id) {
      this.populateFromState(state);
    }

    // 2. IL FIX: Ci iscriviamo (subscribe) ai parametri dell'URL.
    // In questo modo, ogni volta che l'ID nell'URL cambia, Angular eseguirà di nuovo questo 
    // blocco senza bisogno di premere F5, recuperando così il COGNOME dal database!
    this.route.paramMap.subscribe(params => {
      const appointmentId = params.get('id');
      
      if (appointmentId) {
        this.loadDataFromService(appointmentId);
      } else if (state && state.id) {
        // Fallback: se manca l'ID nell'URL ma c'è nello state, usa quello
        this.loadDataFromService(state.id);
      } else {
        console.warn("Nessun ID appuntamento trovato. Impossibile caricare il report.");
      }
    });
  }

  isPatient(): boolean {
    return this.router.url.startsWith('/patient');
  }

  downloadPDF(): void {
    // Inserisci qui la tua logica per scaricare il PDF
    console.log('Download PDF cliccato');
  }

  private loadDataFromService(id: string): void {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment) => {
        this.date = appointment.attendance_date;
        this.reason = appointment.reason;
        this.conclusion = appointment.conclusion || 'Nessuna conclusione registrata.';
        this.cdr.detectChanges(); 

        this.patientService.getPatient(appointment.id_patient).subscribe({
          next: (patient) => {
            // Qui arriva il dato VERO dal database, sovrascrivendo quello parziale dello state
            this.patientName = `${patient.name} ${patient.surname}`;
            this.cdr.detectChanges(); 
          },
          error: (err) => console.error('Errore nel recupero del paziente', err)
        });

        this.doctorService.getDoctor(appointment.id_doctor).subscribe({
          next: (doctor) => {
            this.doctorName = `Dr. ${doctor.name} ${doctor.surname}`;
            this.department = doctor.department;
            this.cdr.detectChanges(); 
          },
          error: (err) => console.error('Errore nel recupero del dottore', err)
        });
      },
      error: (err) => console.error("Errore nel caricamento del report", err)
    });
  }

  private populateFromState(state: any): void {
    // Popolamento temporaneo in attesa dei dati completi dal database
    this.patientName = state.patientName || "Caricamento...";
    this.doctorName = state.doctorName || "Caricamento...";
    this.date = state.date;
    this.department = state.department;
    this.reason = state.description || state.reason; 
    this.conclusion = state.conclusion || 'Nessuna conclusione registrata.';
    this.cdr.detectChanges();
  }
}