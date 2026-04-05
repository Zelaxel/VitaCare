import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { PatientAppointment } from '../appointment/patient-appointment';

@Component({
  selector: 'app-patient-appointment-grid',
  standalone: false,
  templateUrl: './patient-appointment-grid.html',
  styleUrl: './patient-appointment-grid.css',
})
export class PatientAppointmentGrid {
  @Input() appointments: PatientAppointment[] = [];
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
