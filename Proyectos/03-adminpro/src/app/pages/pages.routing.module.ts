import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Progress Bar' },
      },
      {
        path: 'chart1',
        component: Grafica1Component,
        data: { title: 'Chart 1' },
      },
      {
        path: 'account-settings',
        component: AccountSettingComponent,
        data: { title: 'Account Settings' },
      },
      {
        path: 'promise',
        component: PromesasComponent,
        data: { title: 'Promise' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile' },
      },
      //Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { title: 'User Maintenance' },
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { title: 'Hospitals Maintenance' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { title: 'Doctors Maintenance' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { title: 'Doctor Maintenance' },
      },
      // Búsquedas
      {
        path: 'buscar/:termino',
        component: BusquedaComponent,
        data: { title: 'Búsquedas' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
