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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
      id_patient: '1',
      id_doctor: '1',
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
