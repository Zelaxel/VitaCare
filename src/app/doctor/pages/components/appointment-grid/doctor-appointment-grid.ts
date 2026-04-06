import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { DoctorAppointment } from '../appointment/doctor-appointment';

@Component({
  selector: 'app-doctor-appointment-grid',
  standalone: false,
  templateUrl: './doctor-appointment-grid.html',
  styleUrl: './doctor-appointment-grid.css',
})
export class DoctorAppointmentGrid {
  @Input() appointments: DoctorAppointment[] = [];
  buttonDisabled: boolean = false;

  @ViewChild("appointmentGrid") grid!: ElementRef;

  horizontalScroll(amount:number){
    if(this.buttonDisabled) return;
    this.buttonDisabled = true;

    this.grid.nativeElement.scrollBy({left: + amount, behavior: 'smooth'});

    // Debounce
    setTimeout(() => {
      this.buttonDisabled = false;
    }, 100);
  }
}
