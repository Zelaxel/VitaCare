import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-attendance-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-attendance-creator.html',
  styleUrls: ['./doctor-attendance-creator.css']
})
export class DoctorAttendanceCreator {

  department = '';
  doctor = '';
  date = '';
  medicalMatter = '';
  explanation = '';
  notifications = true;

}