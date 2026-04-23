import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { DoctorService } from '../../../services/doctor-service';
import { Doctor } from '../../../model/doctor';

@Component({
  standalone: true,
  selector: 'app-attendance-creator',
  imports: [Header, FormsModule, CommonModule],
  templateUrl: './attendance-creator.html',
  styleUrl: './attendance-creator.css',
})
export class AttendanceCreator implements OnInit{
  departments: string[] = [];
  doctors: any[] = [];

  department = '';
  doctor = '';
  date = '';
  medicalMatter = '';
  explanation = '';
  notifications = true;

  constructor(private doctorService: DoctorService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    fetch('http://localhost:8000/departments')
      .then(res => res.json())
      .then(data => {
        console.log("Departments:", data);
        this.departments = data;
        this.cdr.detectChanges();
      });
  }

  loadDoctorsByDepartment() {
  if (!this.department) {
    this.doctors = [];
    this.doctor = '';
    return;
  }

  const normalizedDept = this.department.toLowerCase();

  this.doctorService
    .getDoctorByDepartment(normalizedDept)
    .subscribe(data => {
      console.log("Doctors:", data);
      this.doctors = data;
      this.doctor = '';
      this.cdr.detectChanges();
    });
  }
  ensureSpaceBelow(event: MouseEvent) {
    setTimeout(() => {window.scrollBy({top: 150, left: 0});}, 100);
  }
}