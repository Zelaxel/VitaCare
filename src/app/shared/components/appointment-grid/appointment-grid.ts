import { Component } from '@angular/core';
import { AppointmentData } from '../appointment/appointmentData';
import { Appointment } from '../appointment/appointment';
import { Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-appointment-grid',
  imports: [Appointment],
  templateUrl: './appointment-grid.html',
  styleUrl: './appointment-grid.css',
})
export class AppointmentGrid {
  @Input() appointments: AppointmentData[] = [];
  buttonDisabled: boolean = false;

  @Input() isPatient!: boolean;

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
