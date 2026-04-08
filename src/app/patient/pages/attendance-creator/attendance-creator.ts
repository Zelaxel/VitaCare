import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-creator',
  standalone: false,
  templateUrl: './attendance-creator.html',
  styleUrls: ['./attendance-creator.css']
})
export class AttendanceCreator {
  department = '';
  doctor = '';
  date = '';
  medicalMatter = '';
  explanation = '';
  notifications = true;
}