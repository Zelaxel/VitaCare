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
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
    },
    {
     date: "Oct '26 - Nov '26",
      hospital: "hospital insular",
      category: "visita de control",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
    },
    {
      date: "Oct '26 - Nov '26",
      hospital: "hospital insular",
      category: "visita de control",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo."
    }
  ];

}


