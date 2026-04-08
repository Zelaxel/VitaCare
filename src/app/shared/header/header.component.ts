import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // usuario de default es el paciente 
  @Input() userRole: string = 'patient'; 
  
  isDropdownMenuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleSettings() {
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
  }

  // volver a la home en base al usuario
  goHome() {
    if (this.userRole === 'doctor') {
      this.router.navigate(['/doctor']);
    } else {
      this.router.navigate(['/patient']);
    }
  }

  logout() {
    this.router.navigate(['/patient/patient-login']);
  }
}