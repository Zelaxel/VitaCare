import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Doctor } from './doctor/doctor';
import { Patient } from './patient/patient';
import { Login } from './login/login';
import { Homepage } from './patient/pages/homepage/homepage';
import { SearchBar } from './patient/pages/components/search-bar/search-bar';
import { Appointment } from './patient/pages/components/appointment/appointment';
import { AppointmentGrid } from './patient/pages/components/appointment-grid/appointment-grid';

@NgModule({
  declarations: [App, Doctor, Patient, Login, Homepage, SearchBar, Appointment, AppointmentGrid],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
