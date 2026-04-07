import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { Doctor } from './doctor/doctor';
import { Patient } from './patient/patient';
import { Login } from './login/login';
import { PatientHomepage } from './patient/pages/homepage/patient-homepage';
import { PatientSearchBar } from './patient/pages/components/search-bar/patient-search-bar';
import { PatientAppointment } from './patient/pages/components/appointment/patient-appointment';
import { PatientAppointmentGrid } from './patient/pages/components/appointment-grid/patient-appointment-grid';
import { DoctorHomepage } from './doctor/pages/homepage/doctor-homepage';
import { DoctorSearchBar } from './doctor/pages/components/search-bar/doctor-search-bar';
import { DoctorAppointment } from './doctor/pages/components/appointment/doctor-appointment';
import { DoctorAppointmentGrid } from './doctor/pages/components/appointment-grid/doctor-appointment-grid';
import { PatientReport } from './patient/pages/report/patient-report';
import { DoctorReport } from './doctor/pages/report/doctor-report';
import { Register } from './patient/pages/register/register';
import { FillReport } from './doctor/pages/fill-report/fill-report';
import { UserProfile } from './patient/pages/user-profile/user-profile';
import { HeaderComponent } from './shared/header/header.component';
import { DoctorInfoComponent } from './patient/doctor-info/doctor-info.component';  

@NgModule({
  declarations: [
    App,
     Doctor,
     Patient,
     Login,
     PatientHomepage,
     PatientSearchBar,
     PatientAppointment,
     PatientAppointmentGrid,
     DoctorHomepage,
     DoctorSearchBar,
     DoctorAppointment,
     DoctorAppointmentGrid,
     PatientReport,
     DoctorReport,
     Register,
     FillReport,
     UserProfile,
     HeaderComponent,
     DoctorInfoComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, RouterModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
