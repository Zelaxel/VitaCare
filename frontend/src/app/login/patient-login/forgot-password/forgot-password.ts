// forgot-password.component.ts
import { Component } from '@angular/core';
import { PatientService } from '../../../services/patient-service';
import { EmailService } from '../../../services/email-service';
import { Email } from '../../../model/email';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  emailInput: string = '';
  constructor(
    private patientService: PatientService,
    private emailService: EmailService
  ) {}

  recoverPassword() {
    if (!this.emailInput) {
      Swal.fire('Warning', 'Insert e-mail address', 'warning');
      return;
    }

    // asking patient data
    this.patientService.getPatientByEmail(this.emailInput).subscribe({
      next: (foundPatient) => {
        
        
        // taking the password from the service
        const mailData: Email = {
          email: foundPatient.mail,
          subject: 'Password recovering',
          message: `Dear ${foundPatient.name}, your password to access is: ${foundPatient.password}`
        };

        this.emailService.sendEmail(mailData).subscribe({
          next: () => {
            Swal.fire('sent!', 'check the mailbox to see the password', 'success');
          },
          error: () => Swal.fire('Error', 'Impossible to send the email', 'error')
        });

      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'No patient found', 'error');
      }
    });
  }
}
