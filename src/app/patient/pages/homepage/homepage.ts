import { Component } from '@angular/core';
import { Appointment } from '../components/appointment/appointment';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  appointments: Appointment[] = [
    {
      id:1,
      tittle: "Anañisis de sangre",
      doctorName: "María Rodríguez Jiménez",
      doctorIcon: "",
      description: "Analisis con motivo de sospecha de anemia",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Laboratory",
      active: true
    },
    {
      id:2,
      tittle: "Revisión",
      doctorName: "Fernando alonso",
      doctorIcon: "",
      description: "Revision periodica",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Primary care",
      active: true
    },
    {
      id:3,
      tittle: "Escaner de mano",
      doctorName: "Gustavo Medina",
      doctorIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Radiology",
      active: true
    },
    {
      id:4,
      tittle: "Escaner de mano",
      doctorName: "Gustavo Medina",
      doctorIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Radiology",
      active: true
    },
    {
      id:5,
      tittle: "Escaner de mano",
      doctorName: "Gustavo Medina",
      doctorIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Radiology",
      active: true
    },
    {
      id:6,
      tittle: "Escaner de mano",
      doctorName: "Gustavo Medina",
      doctorIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Radiology",
      active: true
    },
    {
      id:7,
      tittle: "Escaner de mano",
      doctorName: "Gustavo Medina",
      doctorIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Radiology",
      active: true
    },
    {
      id:8,
      tittle: "Escaner de mano",
      doctorName: "Gustavo Medina",
      doctorIcon: "",
      description: "Radiología de mano derecha",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Radiology",
      active: true
    },
    {
      id:9, tittle: "Revisión oreja",
      doctorName: "María Rodríguez Jiménez",
      doctorIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Otolaryngology",
      active: false
    },
    {
      id:10, tittle: "Revisión oreja",
      doctorName: "María Rodríguez Jiménez",
      doctorIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Otolaryngology",
      active: false
    },
    {
      id:11, tittle: "Revisión oreja",
      doctorName: "María Rodríguez Jiménez",
      doctorIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Otolaryngology",
      active: false
    },
    {
      id:12, tittle: "Revisión oreja",
      doctorName: "María Rodríguez Jiménez",
      doctorIcon: "",
      description: "Revisión del timpano izquierdo",
      date: new Date().toLocaleDateString('es-Es'),
      department: "Otolaryngology",
      active: false
    }
  ];
}
