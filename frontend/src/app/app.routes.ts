import { Routes } from '@angular/router';
import { PatientLogin } from './login/patient-login/patient-login';
import { DoctorLogin } from './login/doctor-login/doctor-login';
import { Register } from './login/register/register';
import { AttendanceCreator } from './shared/pages/attendance-creator/attendance-creator';
import { DoctorInfo } from './patient/pages/doctor-info/doctor-info';
import { PatientHistory } from './doctor/pages/patient-history/patient-history';
import { Home } from './shared/pages/home/home';
import { UserProfile } from './patient/pages/user-profile/user-profile';
import { FillReport } from './doctor/pages/fill-report/fill-report';
import { Report } from './shared/pages/report/report';

export const routes: Routes = [
    {
        path: 'login',
        children: [
            { path: 'log-in', component: PatientLogin },
            { path: 'doctor-log-in', component: DoctorLogin },
            { path: 'register', component: Register },
            { path: '', redirectTo: "log-in", pathMatch: 'full'}
        ]
    },
    {
        path: 'patient',
        children: [
            { path: 'home', component: Home },
            { path: 'report', component: Report },
            { path: 'create-appointment', component: AttendanceCreator },
            { path: 'create-appointment/:id', component: AttendanceCreator},
            { path: 'doctor-info/:id', component: DoctorInfo },
            { path: 'user-profile', component: UserProfile },
            { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    {
        path: 'doctor',
        children: [
            { path: 'home', component: Home },
            { path: 'report', component: Report },
            { path: 'create-appointment', component: AttendanceCreator},
            { path: 'create-appointment/:id', component: AttendanceCreator},
            { path: 'fill-report/:id', component: FillReport },
            { path: 'patient-history/:id', component: PatientHistory },
            { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
