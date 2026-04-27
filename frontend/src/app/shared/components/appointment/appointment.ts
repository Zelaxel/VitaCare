import { Component, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [RouterLink],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment {
  @Input() id!: number;
  @Input() id_patient!: string;
  @Input() id_doctor!: string; 
  @Input() title!: string;
  @Input() doctorName!: string;
  @Input() doctorIcon!: String;
  @Input() patientName!: string;
  @Input() patientIcon!: string;
  @Input() description!: string;
  @Input() date!: string;
  @Input() department!: String;
  @Input() active!: boolean;
  @Input() patientLayaut!: boolean;

  constructor(private router: Router) {}
  isPatient(): boolean {
    return this.router.url.includes('/patient/home');
  }
}