import { Component } from '@angular/core';
import { CronofyService } from '../../../services/cronofy-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cronofy-calendar',
  imports: [],
  templateUrl: './cronofy-calendar.html',
  styleUrl: './cronofy-calendar.css',
})
export class CronofyCalendar {
  constructor(private cronofy: CronofyService, private http: HttpClient) {}
  
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
          // 2. Limpiar el almacenamiento local
          localStorage.removeItem(`cronofy_${identityDocument}`);
          localStorage.removeItem(`cronofy_calendar_${identityDocument}`);
          
          console.log("Calendario desconectado con éxito");
          
          // Opcional: Recargar la página o emitir un evento para actualizar la UI
          window.location.reload(); 
        },
        error: (err) => {
          console.error("Error al revocar el token", err);
          // Incluso si falla la red, es buena idea limpiar lo local para permitir re-conectar
          localStorage.removeItem(`cronofy_${identityDocument}`);
          localStorage.removeItem(`cronofy_calendar_${identityDocument}`);
        }
      });
    }
  }
}
