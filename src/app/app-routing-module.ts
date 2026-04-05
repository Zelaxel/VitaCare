import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Doctor } from "./doctor/doctor";
import {Patient} from './patient/patient';
import {Login} from './login/login';
import {PatientHomepage} from './patient/pages/homepage/patient-homepage';
import {DoctorHomepage} from './doctor/pages/homepage/doctor-homepage';

const routes: Routes = [
  {
    path: 'patient', component: Patient,
    children: [
      { path: 'home', component: PatientHomepage }
    ]
  },
  {
    path: 'doctor', component: Doctor,
    children: [
      { path: 'home', component: DoctorHomepage }
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
