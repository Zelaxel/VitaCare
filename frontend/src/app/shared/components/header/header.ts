import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CronofyCalendar } from "../cronofy-calendar/cronofy-calendar";


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [CommonModule, RouterLink, CronofyCalendar]
})
export class Header {
  
  isDropdownMenuOpen: boolean = false;
  doctorName: string | null = '';
  patientName: string | null = '';
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.doctorName = localStorage.getItem('doctor_surname');
    this.patientName = localStorage.getItem('patient_name');
  }

  isPatient(): boolean {
    return this.router.url.startsWith('/patient');
  }

  isDoctor(): boolean {
    return this.router.url.startsWith('/doctor');
  }

  toggleSettings() {
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  goHome() {
    if (!this.isDoctor()) {
      this.router.navigate(['/doctor']);
    } else {
      this.router.navigate(['/patient']);
    }
  }
}
