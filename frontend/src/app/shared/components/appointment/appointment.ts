import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DoctorService } from '../../../services/doctor-service';
import { AppointmentService } from '../../../services/appointment-service';
import { Doctor } from '../../../model/doctor';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [RouterLink, TitleCasePipe, DatePipe],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment implements OnInit { // Implementamos OnInit
  @Input() id!: number;
  @Input() id_patient!: string;
  @Input() id_doctor!: string; 
  @Input() title!: string;
  @Input() doctorIcon!: string;
  @Input() patientName!: string;
  @Input() patientIcon!: string;
  @Input() description!: string;
  @Input() date!: Date;
  @Input() department!: string;
  @Input() active!: boolean;
  @Input() patientLayaut!: boolean;
  @Output() deleted = new EventEmitter<void>();
  
  public displayDoctorName: string = '';

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDoctorData();
  }

  private loadDoctorData(): void {
    if (this.id_doctor) {
      this.doctorService.getDoctor(this.id_doctor).subscribe({
        next: (doctor: Doctor) => {
          const surname = doctor.surname.split(' ').pop();
          this.displayDoctorName = `Dr. ${surname}`;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching doctor:', err);
          this.displayDoctorName = 'Unknown Doctor';
        }
      });
    }
  }

  onDelete(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer y la cita será cancelada.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Volver atrás',
      reverseButtons: true
    }).then((result) => {
      // Si el usuario hizo clic en "Sí, eliminar"
      if (result.isConfirmed) {
        this.executeDeletion();
      }
    });
  }

  onEdit(): void {
    this.router.navigate(['/patient/create-appointment', this.id]);
  }

  private executeDeletion(): void {
    this.appointmentService.deleteAppointment(this.id).subscribe({
      next: () => {
        Swal.fire(
          '¡Eliminado!',
          'La cita ha sido cancelada correctamente.',
          'success'
        );
        this.deleted.emit();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        Swal.fire(
          'Error',
          'Hubo un problema al intentar eliminar la cita. Inténtalo de nuevo.',
          'error'
        );
      }
    });
  }

  isPatient(): boolean {
    return this.router.url.includes('/patient/home');
  }
}