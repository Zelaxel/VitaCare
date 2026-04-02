import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Doctor } from "./doctor/doctor";
import {Patient} from './patient/patient';
import {Login} from './login/login';

const routes: Routes = [
  {path: 'patient', component: Patient},
  {path: 'doctor', component: Doctor},
  {path: 'login', component: Login},
  {path: '', redirectTo: '/patient', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
