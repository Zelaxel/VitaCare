import { Component } from '@angular/core';
import { SearchBar } from '../../components/search-bar/search-bar';
import { AppointmentData } from '../../components/appointment/appointmentData';
import { AppointmentGrid } from '../../components/appointment-grid/appointment-grid';
import { Header } from '../../components/header/header';
import { Router, RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [SearchBar, AppointmentGrid, Header, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private router: Router) {}
  isPatient(): boolean {
    return this.router.url.includes('/patient/home');
  }

  appointments: AppointmentData[] = [
    {
      id: 0,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: true,
      date: '02-04-2026'
    },
    {
      id: 1,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: true,
      date: '02-04-2026'
    },
    {
      id: 2,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: true,
      date: '02-04-2026'
    },
    {
      id: 3,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: true,
      date: '02-04-2026'
    },
    {
      id: 4,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: true,
      date: '02-04-2026'
    },
    {
      id: 5,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: true,
      date: '02-04-2026'
    },
    {
      id: 6,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: true,
      date: '02-04-2026'
    },
    {
      id: 7,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    },
    {
      id: 8,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    },
    {
      id: 9,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    },
    {
      id: 10,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    },
    {
      id: 11,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    },
    {
      id: 12,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    },
    {
      id: 13,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    },
    {
      id: 14,
      title: 'Blood analisys',
      doctorName: 'David',
      doctorIcon: '',
      patientName: 'Juan',
      patientIcon: '',
      department: 'Laboratory',
      description: 'Lorem itsum',
      active: false,
      date: '02-04-2026'
    }
  ]
}
