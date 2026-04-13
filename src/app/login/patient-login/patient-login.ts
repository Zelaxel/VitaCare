import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-patient-login',
  imports: [RouterLink],
  templateUrl: './patient-login.html',
  styleUrl: './patient-login.css',
})
export class PatientLogin {}
