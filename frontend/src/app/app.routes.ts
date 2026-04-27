import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        children: [
            { path: 'log-in', loadComponent: () => import('./login/patient-login/patient-login').then(m => m.PatientLogin) },
            { path: 'doctor-log-in', loadComponent: () => import('./login/doctor-login/doctor-login').then(m => m.DoctorLogin) },
            { path: 'register', loadComponent: () => import('./login/register/register').then(m => m.Register) },
            { path: '', redirectTo: "log-in", pathMatch: 'full'}
        ]
    },
    {
        path: 'patient',
        children: [
            { path: 'home', loadComponent: () => import('./shared/pages/home/home').then(m => m.Home) },
            { path: 'report', loadComponent: () => import('./shared/pages/report/report').then(m => m.Report)},
            { path: 'create-appointment', loadComponent: () => import('./shared/pages/attendance-creator/attendance-creator').then(m => m.AttendanceCreator)},
            { path: 'doctor-info/:id', loadComponent: () => import('./patient/pages/doctor-info/doctor-info').then(m => m.DoctorInfo)},
            { path: 'user-profile', loadComponent: () => import('./patient/pages/user-profile/user-profile').then(m => m.UserProfile)},
            { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    {
        path: 'doctor',
        children: [
            { path: 'home', loadComponent: () => import('./shared/pages/home/home').then(m => m.Home) },
            { path: 'report', loadComponent: () => import('./shared/pages/report/report').then(m => m.Report)},
            { path: 'create-appointment', loadComponent: () => import('./shared/pages/attendance-creator/attendance-creator').then(m => m.AttendanceCreator)},
            { path: 'fill-report/:id', loadComponent: () => import('./doctor/pages/fill-report/fill-report').then(m => m.FillReport)},
            { path: 'patient-history', loadComponent: () => import('./doctor/pages/patient-history/patient-history').then(m => m.PatientHistory)},
            { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
