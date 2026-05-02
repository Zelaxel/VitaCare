import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../services/appointment-service';
import { Header } from '../../../shared/components/header/header';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient-service';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../../services/doctor-service';
import { firstValueFrom } from 'rxjs';
import { Doctor } from '../../../model/doctor';

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
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
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
        next: async (data: any[]) => {
          const rawHistory = Array.isArray(data) ? data : [data];
          
          // Promise.all procesa todas las citas en paralelo
          this.history = await Promise.all(
            rawHistory.map(async (appointment) => {
              // Buscamos el nombre del doctor para ESTA cita específica
              const name = await this.getDoctorName(appointment.id_doctor);
              return { 
                ...appointment, 
                doctorName: name // Inyectamos el nombre en el objeto
              };
            })
          );
          
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error("Error clinic history:", err)
      });
    }
  }

  async getDoctorName(doctorId: string): Promise<string> {
    try {
      const doctorData: Doctor = await firstValueFrom(this.doctorService.getDoctor(doctorId));
      return doctorData.name || 'Unknown Doctor';
    } catch (error) {
      console.error("Error fetching doctor name:", error);
      return 'Unknown Doctor';
    }
  }
}

