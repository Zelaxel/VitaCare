import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [NgIf]
})
export class Header {
  
  isDropdownMenuOpen: boolean = false;
  
  constructor(private router: Router) {}

  isDoctor(): boolean {
    return this.router.url.includes('/doctor');
  }

  toggleSettings() {
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
  }

  // volver a la home en base al usuario
  goHome() {
    if (!this.isDoctor()) {
      this.router.navigate(['/doctor']);
    } else {
      this.router.navigate(['/patient']);
    }
  }

  logout() {
    this.router.navigate(['/patient/patient-login']);
  }
}
