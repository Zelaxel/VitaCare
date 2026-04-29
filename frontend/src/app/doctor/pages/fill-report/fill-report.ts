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
        active: state.active
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
    // 1. Carichiamo la visita
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment) => {
        this.currentAppointment = appointment;
        
        // Mappa i dati di base (Ipotizzando i nomi dei campi della tua interfaccia)
        this.date = new Date(appointment.attendance_date); 
        this.reason = appointment.reason;
        this.conclusion = appointment.conclusion || '';
        this.cdr.detectChanges();

        // 2. Carichiamo le info del paziente associate a questa visita
        this.patientService.getPatient(appointment.id_patient).subscribe({
          next: (patient) => {
            this.patientName = `${patient.name} ${patient.surname}`; // adatta con i tuoi campi
          }
        });

        // 3. Carichiamo le info del dottore associate a questa visita
        this.doctorService.getDoctor(appointment.id_doctor).subscribe({
          next: (doctor) => {
            this.doctorName = `Dr. ${doctor.name} ${doctor.surname}`; // adatta con i tuoi campi
            this.department = doctor.department;
          }
        });
      },
      error: (err) => {
        console.error('Errore nel caricamento della visita', err);
        alert('Impossibile caricare i dati della visita.');
      }
    });
  }

  goBack(): void {
    // Torna alla pagina precedente tramite il routing di Angular
    this.location.back();
  }

  downloadReport() {
    // 1. Controlliamo di avere l'ID
    if (!this.id) {
      alert("Impossibile scaricare: ID visita mancante.");
      return;
    }

    // 2. Chiamiamo il service
    this.appointmentService.downloadReport(this.id).subscribe({
      next: (fileBlob: Blob) => {
        // 3. Creiamo un URL temporaneo per il file appena scaricato
        const fileUrl = window.URL.createObjectURL(fileBlob);
        
        // 4. Creiamo un "link invisibile" (tag <a>)
        const a = document.createElement('a');
        a.href = fileUrl;
        
        // 5. Diamo un nome al file (qui puoi personalizzarlo, es. Report_David_2026.pdf)
        a.download = `Report_${this.patientName}_${this.date ? this.date.toLocaleDateString() : 'visita'}.pdf`; 
        
        // 6. Aggiungiamo il link alla pagina, lo clicchiamo e lo rimuoviamo subito
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // 7. Puliamo la memoria
        window.URL.revokeObjectURL(fileUrl);
      },
      error: (err) => {
        console.error("Errore durante il download del file:", err);
        alert("Il server non è riuscito a generare il referto per il download.");
      }
    });
  }

  submitReport(): void {
    if (!this.conclusion.trim()) {
      alert('Please enter a conclusion before submitting.');
      return;
    }

    // Aggiorniamo l'oggetto con la nuova conclusione
    this.currentAppointment.conclusion = this.conclusion;
    this.currentAppointment.active = false;

    // Chiamata al backend per salvare l'aggiornamento
    this.appointmentService.updateAppointment(this.currentAppointment).subscribe({
      next: (updatedAppointment) => {
        console.log('Report salvato con successo:', updatedAppointment);
        alert('Report compilato correttamente!');
        
        // Torniamo indietro SOLO quando il salvataggio ha avuto successo
        this.goBack();
      },
      error: (err) => {
        console.error('Errore durante il salvataggio', err);
        alert('Si è verificato un errore durante il salvataggio del report.');
      }
    });
  }
}