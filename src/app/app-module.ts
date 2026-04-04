import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Doctor } from './doctor/doctor';
import { Patient } from './patient/patient';
import { Login } from './login/login';
//import { HomePage } from './patient/pages/home-page/home-page';
import { HeaderComponent } from './shared/header/header.component';
import { DoctorInfoComponent } from './patient/doctor-info/doctor-info.component';

@NgModule({
  declarations: [App, Doctor, Patient, Login, HeaderComponent,DoctorInfoComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
