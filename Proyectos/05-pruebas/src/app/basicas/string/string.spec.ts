import { mensaje, mensaje1 } from './string';
// agrupar pruebas
// describe('Pruebas de Strings');

// prueba individual
// it('Debe devolver un string');
// it('Debe contener un nombre')

describe('Pruebas de string', () => {
  it('Debe regresar un string', () => {
    const resultado = mensaje('Bryan');
    expect(typeof resultado).toBe('string');
  });
  it('Debe contener el string enviado', () => {
    const nombre = 'Solares';
    const resultado = mensaje(nombre);
    expect(resultado).toContain(nombre);
  });
  it('Debe regresar el mismo string enviado', () => {
    const nombre = 'Solares';
    const resultado = mensaje1(nombre);
    expect(resultado).toBe(nombre);
  });
});
