import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-doctor-appointment',
  standalone: false,
  templateUrl: './doctor-appointment.html',
  styleUrl: './doctor-appointment.css',
})
export class DoctorAppointment {
  @Input() id!: number;
  @Input() tittle: string = 'Appointment title';
  @Input() patientName: string = 'User name';
  @Input() patientIcon = '';
  @Input() description: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde.';
  @Input() date: string = 'date'
  @Input() active: boolean = false;
}
