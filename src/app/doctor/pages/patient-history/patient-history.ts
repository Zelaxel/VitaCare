import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-history.html',
  styleUrls: ['./patient-history.css']
})
export class PatientHistory {
  patient = {
    name: 'Name',
    surname: 'Surname',
    department: 'DEP'
  };

  appointments = [
    {
      title: 'Título de la cita',
      doctor: 'Nombre doctor asignado',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit primis aliquet orci quis accumsan in vivamus enim lacus, pretium varius lobortis penatibus curabitur ligula himenaeos luctus fusce convallis facilisi per nisl dapibus tortor.',
      date: 'Fecha'
    },
    {
      title: 'Título de la cita',
      doctor: 'Nombre doctor asignado',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit primis aliquet orci quis accumsan in vivamus enim lacus, pretium varius lobortis penatibus curabitur ligula himenaeos luctus fusce convallis facilisi per nisl dapibus tortor.',
      date: 'Fecha'
    },
    {
      title: 'Título de la cita',
      doctor: 'Nombre doctor asignado',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit primis aliquet orci quis accumsan in vivamus enim lacus, pretium varius lobortis penatibus curabitur ligula himenaeos luctus fusce convallis facilisi per nisl dapibus tortor.',
      date: 'Fecha'
    }
  ];
}