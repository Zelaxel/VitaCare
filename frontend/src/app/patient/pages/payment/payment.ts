import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- Aggiunto ChangeDetectorRef
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Header } from '../../../shared/components/header/header';
import { FormsModule } from '@angular/forms'; 
import { AppointmentService } from '../../../services/appointment-service';
import { DoctorService } from '../../../services/doctor-service';

@Component({
  selector: 'app-payment',
  standalone: true, 
  imports: [Header, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class PaymentComponent implements OnInit {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  appointmentDetails = {
    title: 'Loading...',
    doctorName: 'Loading...',
    description: 'Loading details...',
    date: '',
    price: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    
    if (appointmentId) {
      this.loadRealData(appointmentId);
    }
  }

  loadRealData(id: string) {
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (answer) => {
        
        
        let appointment = answer;
        if (answer && answer.data) appointment = answer.data;
        else if (Array.isArray(answer)) appointment = answer[0];

        let dataFormattata = '';
        if (appointment.attendance_date) {
          dataFormattata = new Date(appointment.attendance_date).toLocaleString('it-IT', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
          });
        }

      
        this.appointmentDetails.title = appointment.title || 'General Checkup';
        this.appointmentDetails.description = appointment.reason || 'No description found.';
        this.appointmentDetails.date = dataFormattata;
        this.appointmentDetails.price = appointment.price || 0;
        this.appointmentDetails.doctorName = 'Finding name.';

        this.cdr.detectChanges();

        
        if (appointment.id_doctor) {
          this.doctorService.getDoctor(appointment.id_doctor).subscribe({
            next: (doctor) => {
              this.appointmentDetails.doctorName = `Dr. ${doctor.name} ${doctor.surname}`;
              this.cdr.detectChanges(); 
              console.log("3. Doctor found!");
            },
            error: () => {
              this.appointmentDetails.doctorName = 'Unknown Doctor';
              this.cdr.detectChanges();
            }
          });
        }

      },
      error: (err) => {
        console.error("ERRORE:", err);
        Swal.fire('Error', 'Impossible to load data', 'error');
      }
    });
  }

  isPatient(): boolean {
    return true; 
  }

  formatCardNumber(value: string): string {
    return value
      .replace(/\D/g, '')
      .slice(0, 12)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  processPayment() {
    const appointmentId = this.route.snapshot.paramMap.get('id');

    if (!appointmentId) {
      Swal.fire('Error', 'No appointment found.', 'error');
      return;
    }

    if (!this.cardNumber || !this.expiryDate || !this.cvv) {
      Swal.fire('Warning', 'Please fill all card fields.', 'warning');
      return;
    }

    const cleanCard = this.cardNumber.replace(/\s+/g, '');

    if (!/^\d{12}$/.test(cleanCard)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid card number',
        text: 'Card must contain exactly 12 digits (formatted as 1234 5678 9012).'
      });
      return;
    }

    if (cleanCard !== '123456789012') {
      Swal.fire({
        icon: 'error',
        title: 'Transaction declined',
        text: 'Card not recognized by the system.',
        footer: 'Use test card: 1234 5678 9012'
      });
      return;
    }

    Swal.fire({
      title: 'Processing payment...',
      html: 'Contacting bank system...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        setTimeout(() => {
          this.appointmentService.confirmPayment(appointmentId).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Payment successful',
                text: 'The appointment has been marked as paid.'
              }).then(() => {
                this.router.navigate(['/patient/home']);
              });
            },
            error: (err) => {
              console.error('Payment sync error:', err);
              Swal.fire(
                'Error',
                'Payment was approved but failed to update the server.',
                'error'
              );
            }
          });
        }, 1500);
      }
    });
  }
}