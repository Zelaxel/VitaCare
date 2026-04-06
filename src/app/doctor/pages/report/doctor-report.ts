import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './doctor-report.html',
  styleUrl: './doctor-report.css',
})
export class DoctorReport {
  patientName: string = "patient";
  doctorName: string = "doctor";
  date: string = "date";
  department: string = "department";
  reason: string = "Lorem ipsum dolor sit amet consectetur adipiscing elit, nostra velit aliquam id habitant neque parturient, inceptos nascetur urna pharetra curae hendrerit. Habitant nisi rhoncus commodo urna leo vehicula fusce libero sagittis porttitor massa luctus turpis auctor in, per orci morbi eros eget proin convallis tristique dapibus et sodales ornare ut justo. Inceptos lobortis fringilla dignissim purus sem malesuada viverra lacinia laoreet accumsan, primis urna phasellus tellus senectus sagittis litora consequat ante. Leo et aenean aptent ante laoreet luctus, phasellus facilisi nec tempor auctor suscipit, euismod porta eget platea pretium.";
  conclusion: string = "Lorem ipsum dolor sit amet consectetur adipiscing elit, nostra velit aliquam id habitant neque parturient, inceptos nascetur urna pharetra curae hendrerit. Habitant nisi rhoncus commodo urna leo vehicula fusce libero sagittis porttitor massa luctus turpis auctor in, per orci morbi eros eget proin convallis tristique dapibus et sodales ornare ut justo. Inceptos lobortis fringilla dignissim purus sem malesuada viverra lacinia laoreet accumsan, primis urna phasellus tellus senectus sagittis litora consequat ante. Leo et aenean aptent ante laoreet luctus, phasellus facilisi nec tempor auctor suscipit, euismod porta eget platea pretium.";
}
