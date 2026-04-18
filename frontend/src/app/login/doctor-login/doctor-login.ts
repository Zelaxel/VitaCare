import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-doctor-login',
  imports: [RouterLink],
  templateUrl: './doctor-login.html',
  styleUrl: './doctor-login.css',
})
export class DoctorLogin {}
