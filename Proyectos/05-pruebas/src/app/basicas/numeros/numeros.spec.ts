import { incrementar } from './numeros';
describe('Pruebas de números', () => {
  it('Debe retornar 100 si número mayor de 100', () => {
    const resultado = incrementar(300);
    expect(resultado).toBe(100);
  });

  it('Debe número + 1 si no es mayor a 100', () => {
    const resultado = incrementar(50);
    expect(resultado).toBe(51);
  });
});
