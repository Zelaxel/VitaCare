import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
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