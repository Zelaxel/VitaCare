import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment {
  @Input() id!: number;
  @Input() tittle: string = 'Appointment title';
  @Input() doctorName: string = 'User name';
  @Input() doctorIcon = '';
  @Input() description: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde.';
  @Input() date: string = 'date'
  @Input() department = 'department';
  @Input() active: boolean = false;
}
