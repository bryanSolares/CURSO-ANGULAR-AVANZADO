import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from '../../intermedio2/hospital/hospital.component';
import { MedicoComponent } from '../../intermedio2/medico/medico.component';
import { IncrementadorComponent } from '../../intermedio2/incrementador/incrementador.component';

export const ROUTES: Routes = [
  { path: 'hospital', component: HospitalComponent },
  { path: 'medico/:id', component: MedicoComponent },
  { path: '**', component: IncrementadorComponent },
];
