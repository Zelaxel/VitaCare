import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'patient',
        children: [
            { path: 'home', loadComponent: () => import('./shared/pages/home/home').then(m => m.Home) },
            { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    {
        path: 'doctor',
        children: [
            { path: 'home', loadComponent: () => import('./shared/pages/home/home').then(m => m.Home) },
        ]
    },
    { path: '', redirectTo: 'patient', pathMatch: 'full'}
];
