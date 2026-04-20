import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [CommonModule, RouterLink]
})
export class Header {
  
  isDropdownMenuOpen: boolean = false;
  doctorName: string | null = '';
  patientName: string | null = '';
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.doctorName = localStorage.getItem('doctor_surname');
    this.patientName = localStorage.getItem('identity_document');
  }

  isPatient(): boolean {
    return this.router.url.includes('/patient');
  }

  isDoctor(): boolean {
    return this.router.url.includes('/doctor');
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
