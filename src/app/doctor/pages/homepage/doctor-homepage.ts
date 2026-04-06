import { Component } from '@angular/core';
import { DoctorAppointment } from '../components/appointment/doctor-appointment';
import { DoctorAppointmentGrid } from '../components/appointment-grid/doctor-appointment-grid';

@Component({
  selector: 'app-doctor-homepage',
  standalone: false,
  templateUrl: './doctor-homepage.html',
  styleUrl: './doctor-homepage.css',
})
export class DoctorHomepage {
  appointments: DoctorAppointment[] = [
    {
      id:1,
      tittle: "Analisis de sangre",
      patientName: "María Rodríguez Jiménez",
      patientIcon: "",
      description: "Analisis con motivo de sospecha de anemia",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:2,
      tittle: "Revisión",
      patientName: "Fernando alonso",
      patientIcon: "",
      description: "Revision periodica",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:3,
      tittle: "Escaner de mano",
      patientName: "Gustavo Medina",
      patientIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:4,
      tittle: "Escaner de mano",
      patientName: "Gustavo Medina",
      patientIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:5,
      tittle: "Escaner de mano",
      patientName: "Gustavo Medina",
      patientIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:6,
      tittle: "Escaner de mano",
      patientName: "Gustavo Medina",
      patientIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:7,
      tittle: "Escaner de mano",
      patientName: "Gustavo Medina",
      patientIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:8,
      tittle: "Escaner de mano",
      patientName: "Gustavo Medina",
      patientIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      active: true
    },
    {
      id:9, tittle: "Revisión oreja",
      patientName: "María Rodríguez Jiménez",
      patientIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      active: false
    },
    {
      id:10, tittle: "Revisión oreja",
      patientName: "María Rodríguez Jiménez",
      patientIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      active: false
    },
    {
      id:11, tittle: "Revisión oreja",
      patientName: "María Rodríguez Jiménez",
      patientIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      active: false
    },
    {
      id:12, tittle: "Revisión oreja",
      patientName: "María Rodríguez Jiménez",
      patientIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      active: false
    }
  ];
}
