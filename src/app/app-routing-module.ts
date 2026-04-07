import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Doctor } from "./doctor/doctor";
import {Patient} from './patient/patient';
import {Login} from './login/login';
import {PatientHomepage} from './patient/pages/homepage/patient-homepage';
import {DoctorHomepage} from './doctor/pages/homepage/doctor-homepage';
import {PatientReport} from './patient/pages/report/patient-report';
import {DoctorReport} from './doctor/pages/report/doctor-report';
import { PatientHistory } from './doctor/pages/patient-history/patient-history';
import { AttendanceCreator } from './patient/pages/attendance-creator/attendance-creator';
import { FillReport } from './doctor/pages/fill-report/fill-report';
import { UserProfile } from './patient/pages/user-profile/user-profile';
import { DoctorInfoComponent } from './patient/pages/doctor-info/doctor-info.component';
import { Register } from './patient/pages/register/register';

const routes: Routes = [
  {
    path: 'patient', component: Patient,
    children: [
      { path: 'home', component: PatientHomepage },
      { path: 'report', component: PatientReport },
      { path: 'register', component: Register},
      { path: 'create-appointment', component: AttendanceCreator},
      { path: 'doctor-info', component: DoctorInfoComponent},
    ]
  },
  {
    path: 'doctor', component: Doctor,
    children: [
      { path: 'home', component: DoctorHomepage },
      { path: 'report', component: DoctorReport },
      { path: 'fill-report', component: FillReport },
      { path: 'patient-history', component: PatientHistory }

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
