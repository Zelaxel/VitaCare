import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient-service';
import { EmailService } from '../../services/email-service';
import { Email } from '../../model/email';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-lost-account',
  imports: [FormsModule],
  templateUrl: './lost-account.html',
  styleUrl: './lost-account.css',
})
export class ForgotPasswordComponent {
  emailInput: string = '';
  constructor(
    private patientService: PatientService,
    private emailService: EmailService,
    private router: Router
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
          subject: 'Resetting access credentials',
          message: `
          <p>Hello ${foundPatient.name}👋!</p>
          <p>We have received a request to recover your account credentials. Please find your information below:</p>
          <ul>
            <li><strong>Service:</strong> Patient Portal</li>
            <li><strong>Access Password:</strong> ${foundPatient.password}</li>
          </ul>
          <p>For your security, we recommend changing this password after your next login.</p>
          <p>Best regards,<br>
          The Technical Support Team</p>
          `
        };

        this.emailService.sendEmail(mailData).subscribe({
          next: () => {
            this.router.navigate(['/login/email-sent']);
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



