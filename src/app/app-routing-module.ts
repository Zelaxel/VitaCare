import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Doctor } from "./doctor/doctor";
import {Patient} from './patient/patient';
import {PatientHomepage} from './patient/pages/homepage/patient-homepage';
import { PatientLogin } from './patient/pages/patient-login/patient-login';
import {DoctorHomepage} from './doctor/pages/homepage/doctor-homepage';
import {PatientReport} from './patient/pages/report/patient-report';
import {DoctorReport} from './doctor/pages/report/doctor-report';
import { DoctorInfoComponent } from './patient/doctor-info/doctor-info.component';
import { DoctorLogin } from './doctor/pages/doctor-login/doctor-login';

const routes: Routes = [
  {
    path: 'patient', component: Patient,
    children: [
      { path: 'home', component: PatientHomepage },
      { path: 'report', component: PatientReport },
      { path: 'doctor-info', component: DoctorInfoComponent },
      { path: 'patient-login', component: PatientLogin}
    ]
  },
  {
    path: 'doctor', component: Doctor,
    children: [
      { path: 'home', component: DoctorHomepage },
      { path: 'report', component: DoctorReport },
      { path: 'doctor-login', component: DoctorLogin}
    ]
  },
  {path: '', redirectTo: '/patient/patient-login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
