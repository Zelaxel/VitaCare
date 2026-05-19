import { AppointmentData } from '../appointment/appointmentData';
import { Appointment } from '../appointment/appointment';
import { OnChanges, Component, EventEmitter, HostListener, Output, Input, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-appointment-grid',
  imports: [Appointment],
  templateUrl: './appointment-grid.html',
  styleUrl: './appointment-grid.css',
})
export class AppointmentGrid implements OnChanges  {
  @Input() appointments: AppointmentData[] = [];
  showScrollButtons: boolean = false;

  @Input() isPatient!: boolean;

  @ViewChild("appointmentGrid") grid!: ElementRef<HTMLDivElement>;

  @Output() deletedAppointment = new EventEmitter<void>();

  horizontalScroll(amount:number){
    this.grid.nativeElement.scrollBy({left: + amount, behavior: 'smooth'});
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.showScrollButtons = this.checkScrolleable();
  }
  
  ngOnChanges() {
    this.showScrollButtons = this.checkScrolleable();
  }
  
  checkScrolleable(): boolean {
    if(!this.grid) return false;
    const mode: number = +getComputedStyle(this.grid.nativeElement).getPropertyValue('--mode').trim();
    switch(mode){
      case 0:
        return this.appointments.length > 6;
        case 1:
          return this.appointments.length > 4;
      default:
        return this.appointments.length > 2
    }
  }
}
