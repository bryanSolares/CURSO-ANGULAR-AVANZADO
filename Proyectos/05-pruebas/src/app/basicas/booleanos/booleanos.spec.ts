import { usuarioLogueado } from './booleanos';
describe('Pruebas de booleanos', () => {
  it('Debe retornar true', () => {
    const resultado = usuarioLogueado();
    expect(resultado).toBeTruthy();
    expect(resultado).toBe(true);
  });
});
