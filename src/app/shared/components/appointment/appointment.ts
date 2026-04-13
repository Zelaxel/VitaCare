import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment {
  @Input() id!: number;
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
}