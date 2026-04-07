import { Component } from '@angular/core';

@Component({
  selector: 'app-fill-report',
  standalone: false,
  templateUrl: './fill-report.html',
  styleUrl: './fill-report.css',
})
export class FillReport {
  // Dati del paziente e della visita (Mock data)
  patientName: string = 'John Doe'; 
  doctorName: string = 'Dr. Smith';
  date: string = '06/04/2026'; // Rinominata da reportDate a date per l'HTML
  department: string = 'Cardiology';
  reason: string = 'Routine check-up and mild chest pain.'; // Rinominata da consultationReason a reason
  
  // Questa variabile è legata alla textarea tramite [(ngModel)]
  conclusion: string = ''; // Rinominata da doctorConclusion a conclusion

  constructor() {}

  goBack(): void {
    console.log('Navigating back to home...');
    // In futuro userai: this.router.navigate(['/doctor/home']);
  }

  downloadReport(): void {
    console.log('Generating PDF for download...');
  }

  submitReport(): void {
    if (!this.conclusion.trim()) {
      alert('Please enter a conclusion before submitting.');
      return;
    }
    console.log('Report submitted successfully:', this.conclusion);
    // Qui chiamerai il tuo servizio API
  }
}