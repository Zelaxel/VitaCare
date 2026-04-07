import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doctor-info',
  standalone: false,
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent {
  
  // datos de prueba
  // datos doctor
  doctor = {
    name: 'francesco',
    surname: 'picotto',
    department: 'CARDIOLOGY',
    visitingHours: '08:00 - 14:00 lun-vie'
  };

  // datos curriculum
  appointments = [
    {
      date: "Oct '26 - Nov '26",
      hospital: "hospital insular",
      category: "visita de control",
      description: "blablablablablablablablablablablablablablablablablablablablablablablabla"
    },
    {
     date: "Oct '26 - Nov '26",
      hospital: "hospital insular",
      category: "visita de control",
      description: "blablablablablablablablablablablablablablablablablablablablablablablabla"
    },
    {
      date: "Oct '26 - Nov '26",
      hospital: "hospital insular",
      category: "visita de control",
      description: "blablablablablablablablablablablablablablablablablablablablablablablabla"
    }
  ];

}


