import { obtenerRobots } from './arreglos';
describe('Pruebas de arreglos', () => {
  it('Debe retornar almenos 3 robots', () => {
    const resultado = obtenerRobots();
    expect(resultado.length).toBeGreaterThanOrEqual(3);
  });

  it('Debe de existir Megaman y Ultron', () => {
    const resultado = obtenerRobots();
    expect(resultado).toContain('Megaman');
    expect(resultado).toContain('Ultron');
  });
});
