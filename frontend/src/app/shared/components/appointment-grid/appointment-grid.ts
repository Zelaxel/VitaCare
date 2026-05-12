import { Component, EventEmitter, Output } from '@angular/core';
import { AppointmentData } from '../appointment/appointmentData';
import { Appointment } from '../appointment/appointment';
import { Input, ViewChild, ElementRef } from '@angular/core';
import { AfterViewInit, OnChanges } from '@angular/core';


@Component({
  selector: 'app-appointment-grid',
  imports: [Appointment],
  templateUrl: './appointment-grid.html',
  styleUrl: './appointment-grid.css',
})
export class AppointmentGrid {
  @Input() appointments: AppointmentData[] = [];
  buttonDisabled: boolean = false;
  showScrollButtons: boolean = false;

  @Input() isPatient!: boolean;

  @ViewChild("appointmentGrid") grid!: ElementRef;

  @Output() deletedAppointment = new EventEmitter<void>();

  ngAfterViewInit(): void {
  setTimeout(() => this.checkScrollable());
}

ngOnChanges(): void {
  setTimeout(() => this.checkScrollable());
}

checkScrollable(): void {
  if (!this.grid) return;

  const element = this.grid.nativeElement;
  this.showScrollButtons = element.scrollWidth > element.clientWidth;
}

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
