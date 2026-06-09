import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardViewComponent } from './features/dashboard/dashboard-view/dashboard-view.component';
import { AppointmentsListComponent } from './features/appointments/appointments-list/appointments-list.component';
import { PatientsListComponent } from './features/patients/patients-list/patients-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardViewComponent },
      { path: 'citas', component: AppointmentsListComponent },
      { path: 'pacientes', component: PatientsListComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
