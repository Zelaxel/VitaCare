import { Component } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Appointment } from '../../components/appointment/appointment';
import { AppointmentGrid } from '../../components/appointment-grid/appointment-grid';
import { Header } from '../../components/header/header';
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [SearchBar, AppointmentGrid, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private router: Router) {}
  isPatient(): boolean {
    return this.router.url.includes('/patient/home');
  }

  appointments: Appointment[] = [
    {
      id:1,
      tittle: 'Appointment title',
      doctorName: 'Doctor name',
      doctorIcon: '',
      patientName: 'Doctor name',
      patientIcon: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aspernatur, dolorem necessitatibus neque non numquam officiis, perferendis possimus quaerat quasi, quos voluptatibus! Animi dicta ex illo maiores quo quod unde.',
      date: 'date',
      department: 'department',
      active: false
    }
  ];
}
