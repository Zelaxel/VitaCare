import { Component, inject } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment {
  @Input() id!: number;
  @Input() tittle: string = 'Appointment title';
  @Input() doctorName: string = 'Doctor name';
  @Input() doctorIcon = '';
  @Input() patientName: string = 'Doctor name';
  @Input() patientIcon = '';
  @Input() description: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde.';
  @Input() date: string = 'date'
  @Input() department = 'department';
  @Input() active: boolean = false;

  private router = inject(Router);

  isPatient(): boolean {
    return this.router.url.includes('/patient');
  }
}