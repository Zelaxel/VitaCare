import { Component, OnInit } from '@angular/core';
import { CronofyService } from '../../../services/cronofy-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cronofy-calendar',
  imports: [],
  templateUrl: './cronofy-calendar.html',
  styleUrl: './cronofy-calendar.css',
})
export class CronofyCalendar implements OnInit {

  public isConnected = false;

  constructor(private cronofy: CronofyService, private http: HttpClient) {}

  ngOnInit() {
    this.checkConnection();
  }
  
  checkConnection() {
    const identityDocument = localStorage.getItem('identity_document');
    if (identityDocument) {
      this.isConnected = !!localStorage.getItem(`cronofy_${identityDocument}`);
    }
  }

  connectCalendar() {
    const identityDocument = localStorage.getItem('identity_document');
    localStorage.removeItem(`cronofy_${identityDocument}`);
    localStorage.removeItem(`cronofy_calendar_${identityDocument}`);

    this.http.get<any>('http://localhost:8000/cronofy-auth').subscribe(res => {
      window.location.href = res.url;
    });
  }

  disconnectCalendar() {
    const identityDocument = localStorage.getItem('identity_document');
    if (!identityDocument) return;

    const cronofyRaw = localStorage.getItem(`cronofy_${identityDocument}`);

    if (cronofyRaw) {
      const cronofyData = JSON.parse(cronofyRaw);
      const token = cronofyData.access_token;

      this.http.post('http://localhost:8000/cronofy/revoke', { token }).subscribe({
        next: () => {
          localStorage.removeItem(`cronofy_${identityDocument}`);
          localStorage.removeItem(`cronofy_calendar_${identityDocument}`);
          
          console.log("Calendario desconectado con éxito");
          window.location.reload(); 
        },
        error: (err) => {
          console.error("Error al revocar el token", err);
          localStorage.removeItem(`cronofy_${identityDocument}`);
          localStorage.removeItem(`cronofy_calendar_${identityDocument}`);
        }
      });
    }
  }
}
