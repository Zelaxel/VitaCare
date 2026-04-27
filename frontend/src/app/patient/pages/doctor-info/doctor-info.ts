import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/components/header/header';
import { DoctorService } from '../../../services/doctor-service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../services/appointment-service';

@Component({
  standalone: true,
  selector: 'app-doctor-info',
  imports: [Header, CommonModule],
  templateUrl: './doctor-info.html',
  styleUrl: './doctor-info.css',
})
export class DoctorInfo implements OnInit {
  currentDoctor: any = null; 
  pastVisits: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const doctorId = this.route.snapshot.paramMap.get('id');
    console.log("Sto cercando il dottore con ID:", doctorId); // <-- NUOVO LOG

    if (doctorId) {
      this.doctorService.getDoctor(doctorId).subscribe({
        next: (doc) => {
          this.currentDoctor = Array.isArray(doc) ? doc[0] : doc;
          console.log("DATI DOTTORE RICEVUTI:", this.currentDoctor); // <-- LOG RIMESSO
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error("Errore dottore", err)
      });

      this.appointmentService.getAppointmentByDoctor(doctorId).subscribe({
        next: (visits: any[]) => {
          this.pastVisits = Array.isArray(visits) ? visits : [visits];
          console.log("VISITE RICEVUTE:", this.pastVisits); // <-- LOG RIMESSO
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Errore visite", err)
      });
    }
  }
}