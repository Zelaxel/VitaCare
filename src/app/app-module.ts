import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { Doctor } from './doctor/doctor';
import { Patient } from './patient/patient';
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
import { PatientHistory } from './doctor/pages/patient-history/patient-history';
import { AttendanceCreator } from './patient/pages/attendance-creator/attendance-creator';
import { FillReport } from './doctor/pages/fill-report/fill-report';
import { UserProfile } from './patient/pages/user-profile/user-profile';
import { HeaderComponent } from './shared/header/header.component';
import { PatientLogin } from './patient/pages/patient-login/patient-login';
import { DoctorLogin } from './doctor/pages/doctor-login/doctor-login';
import { DoctorInfoComponent } from './patient/pages/doctor-info/doctor-info.component';

@NgModule({
  declarations: [
    App,
    Doctor,
    Patient,
    PatientHomepage,
    PatientSearchBar,
    PatientAppointment,
    PatientAppointmentGrid,
    PatientHomepage,
    PatientHistory,
    DoctorHomepage,
    DoctorSearchBar,
    DoctorAppointment,
    DoctorAppointmentGrid,
    PatientReport,
    DoctorReport,
    HeaderComponent,
    DoctorInfoComponent,
    PatientLogin,
    DoctorLogin,
    AttendanceCreator,
    FillReport,
    UserProfile,
    Register
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, RouterModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
