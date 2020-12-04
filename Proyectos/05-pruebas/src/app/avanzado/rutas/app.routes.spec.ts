import { ROUTES } from './app.routes';
import { MedicoComponent } from './../../intermedio2/medico/medico.component';
describe('Rutas Principales', () => {
  it('Debe de existir la ruta /medico/:id', () => {
    expect(ROUTES).toContain({
      path: 'medico/:id',
      component: MedicoComponent,
    });
  });
});
