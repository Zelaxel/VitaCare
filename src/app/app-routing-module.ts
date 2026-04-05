import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Doctor } from "./doctor/doctor";
import {Patient} from './patient/patient';
import {Login} from './login/login';
import {PatientHomepage} from './patient/pages/homepage/patient-homepage';
import {DoctorHomepage} from './doctor/pages/homepage/doctor-homepage';
import {PatientReport} from './patient/pages/report/patient-report';
import {DoctorReport} from './doctor/pages/report/doctor-report';

const routes: Routes = [
  {
    path: 'patient', component: Patient,
    children: [
      { path: 'home', component: PatientHomepage },
      { path: 'report', component: PatientReport }
    ]
  },
  {
    path: 'doctor', component: Doctor,
    children: [
      { path: 'home', component: DoctorHomepage },
      { path: 'report', component: DoctorReport }
    ]
  },
  {path: 'login', component: Login},
  {path: '', redirectTo: '/patient/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
