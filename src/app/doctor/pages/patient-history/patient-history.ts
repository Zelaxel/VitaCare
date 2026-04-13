import { Component } from '@angular/core';
import { Header } from '../../../shared/components/header/header';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-patient-history',
  imports: [Header, CommonModule],
  templateUrl: './patient-history.html',
  styleUrl: './patient-history.css',
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
