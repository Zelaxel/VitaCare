import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';

import { Header } from '../../components/header/header';
// Controlla che questi percorsi siano corretti
import { AppointmentService } from '../../../services/appointment-service';
import { PatientService } from '../../../services/patient-service';
import { DoctorService } from '../../../services/doctor-service';

// Importa solo jsPDF
import { jsPDF } from 'jspdf';

@Component({
  standalone: true,
  selector: 'app-report',
  imports: [Header, DatePipe, TitleCasePipe],
  templateUrl: './report.html',
  styleUrl: './report.css',
  providers: [DatePipe] // Aggiungiamo DatePipe qui per poterlo usare nel codice TS
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
  private datePipe = inject(DatePipe); // Iniettato per formattare la data nel PDF

  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    const state = history.state;

    if (appointmentId) {
      this.loadDataFromService(appointmentId);
    } else if (state && state.id) {
      this.populateFromState(state);
    } else {
      console.warn("Nessun ID appuntamento trovato. Impossibile caricare il report.");
    }
  }

  isPatient(): boolean {
    return this.router.url.startsWith('/patient');
  }

  public downloadPDF(): void {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Imposta il titolo
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Medical Appointment Report', 105, 20, { align: 'center' });

    // Informazioni generali
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    // Formatta la data per evitare [object Object] se è di tipo Date
    const formattedDate = this.datePipe.transform(this.date, 'mediumDate') || String(this.date);

    pdf.text(`Patient Name: ${this.patientName}`, 20, 40);
    pdf.text(`Doctor: ${this.doctorName}`, 20, 50);
    pdf.text(`Date: ${formattedDate}`, 20, 60); 
    pdf.text(`Department: ${this.department}`, 20, 70);

    // Linea di separazione
    pdf.line(20, 75, 190, 75);

    // Ragione dell'appuntamento (Reason)
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Appointment Reason:', 20, 85);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    // splitTextToSize divide il testo in un array di righe in base alla larghezza (170mm)
    const reasonLines = pdf.splitTextToSize(this.reason, 170);
    pdf.text(reasonLines, 20, 95);

    // Calcolo dinamico dell'altezza: parte da Y=95, calcola circa 7mm per ogni riga di "reason" e aggiunge 15mm di spazio
    const conclusionY = 95 + (reasonLines.length * 7) + 15; 

    // Conclusioni del dottore
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Doctor\'s Conclusion:', 20, conclusionY);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const conclusionLines = pdf.splitTextToSize(this.conclusion, 170);
    pdf.text(conclusionLines, 20, conclusionY + 10);

    // Salva il file PDF
    const safeName = this.patientName.replace(/\s+/g, '_');
    pdf.save(`Medical_Report_${safeName}.pdf`);
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
    this.patientName = state.patientName || "Caricamento...";
    this.doctorName = state.doctorName || "Caricamento...";
    this.date = state.date;
    this.department = state.department;
    this.reason = state.description || state.reason; 
    this.conclusion = state.conclusion || 'Nessuna conclusione registrata.';
    this.cdr.detectChanges();
  }
}