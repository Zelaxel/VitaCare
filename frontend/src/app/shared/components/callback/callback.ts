import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.css',
})
export class Callback implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        console.log("PARAMS:", params);
        const code = params['code'];

        if (!code) {
          console.error("OAuth code not received");
          alert("Unable to connect Google Calendar.");
          this.redirectToAppointmentCreator();
          return;
        }
        this.exchangeToken(code);
      },
      error: (err) => {
        console.error("Query params error:", err);
        this.redirectToAppointmentCreator();
      }
    });
  }

  private exchangeToken(code: string): void {
    this.http.post<any>(
      'http://localhost:8000/exchange-token',
      { code }
    ).subscribe({
      next: (response) => {
        console.log("CRONOFY TOKENS:", response);
        if (!response.access_token) {
          console.error("Access token missing");
          alert("Calendar connection failed.");
          this.redirectToAppointmentCreator();
          return;
        }

        const identityDocument = localStorage.getItem('identity_document');

        if (!identityDocument) {
          alert("User session missing");
          return;
        }

        const cronofyData = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          account_id: response.account_id,
          connected: true,
          connected_at: new Date().toISOString()
        };

        localStorage.setItem(
          `cronofy_${identityDocument}`,
          JSON.stringify(cronofyData)
        );

        console.log("Google Calendar connected successfully");
        alert("Google Calendar connected successfully!");
        this.redirectToAppointmentCreator();
      },

      error: (err) => {
        console.error("Exchange token error:", err);
        alert("Unable to connect calendar.");
        this.redirectToAppointmentCreator();
      }
    });
  }

  private redirectToAppointmentCreator(): void {
    const currentRole = localStorage.getItem('role');

    if (currentRole === 'doctor') {
      this.router.navigate([
        '/doctor/create-appointment'
      ]);
    } else {
      this.router.navigate([
        '/patient/create-appointment'
      ]);
    }
  }
}