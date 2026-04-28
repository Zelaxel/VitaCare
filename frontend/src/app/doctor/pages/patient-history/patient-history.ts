import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../services/appointment-service';
import { Header } from '../../../shared/components/header/header';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient-service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-patient-history',
  imports: [Header, CommonModule, RouterLink],
  templateUrl: './patient-history.html',
  styleUrl: './patient-history.css',
})
export class PatientHistory implements OnInit {
  patientId: string | null = null;
  currentPatient: any = null;
  history: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // read id patient
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (this.patientId) {
      this.patientService.getPatient(this.patientId).subscribe({
        next: (data) => {
          this.currentPatient = Array.isArray(data) ? data[0] : data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error("Error in patient data:", err)
      });
      this.appointmentService.getAppointmentByPatient(this.patientId).subscribe({
        next: (data: any[]) => {
          this.history = Array.isArray(data) ? data : [data];
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error("Error clinic history:", err)
      });
    }
  }
}

