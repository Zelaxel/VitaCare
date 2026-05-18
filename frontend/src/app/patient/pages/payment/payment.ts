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

  processPayment() {
    const numeroCartaPulito = this.cardNumber.replace(/\s+/g, '');
    if (!this.cardNumber || !this.expiryDate || !this.cvv) {
      Swal.fire('Attenzione', 'Per favore, compila tutti i dati della carta.', 'warning');
      return;
    }

    // STRIPE simulation
    if (numeroCartaPulito !== '4242424242424242') {
      Swal.fire({
        icon: 'error',
        title: 'Transazione Rifiutata',
        text: 'La carta inserita non è valida o è stata rifiutata dal circuito bancario.',
        footer: 'Suggerimento: Usa la carta di test 4242 4242 4242 4242'
      });
      return;
    }
    const appointmentId = this.route.snapshot.paramMap.get('id');
    if (!appointmentId) {
      Swal.fire('Errore', 'Impossibile trovare la visita di riferimento.', 'error');
      return;
    }

    // 5. IL PROCESSO IN 3 FASI (Grafica realistica)
    Swal.fire({
      title: 'Connessione al circuito bancario...',
      html: 'Autorizzazione in corso tramite <b>Stripe</b>.<br/>Attendere prego.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        
        setTimeout(() => {
          
          Swal.update({
            title: 'Autorizzazione ricevuta!',
            html: 'Registrazione del pagamento nel database in corso...'
          });

          
          this.appointmentService.confirmPayment(appointmentId).subscribe({
            next: () => {
              Swal.fire(
                'Pagamento Completato!',
                'La ricevuta è stata generata e la visita è pagata.',
                'success'
              ).then(() => {
                this.router.navigate(['/home']); // Riporta il paziente alla home
              });
            },
            error: (err) => {
              console.error("Errore di sincronizzazione col database:", err);
              Swal.fire('Errore Interno', 'La banca ha autorizzato ma il server della clinica non risponde.', 'error');
            }
          });

        }, 1500);
      }
    });
  }
}