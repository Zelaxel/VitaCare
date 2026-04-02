import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { Appointment } from '../appointment/appointment';

@Component({
  selector: 'app-appointment-grid',
  standalone: false,
  templateUrl: './appointment-grid.html',
  styleUrl: './appointment-grid.css',
})
export class AppointmentGrid {
  @Input() appointments: Appointment[] = [];
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
