import { Jugador2 } from './jugador2';
describe('Jugador 2 emmit', () => {
  let jugador: Jugador2;
  beforeEach(() => {
    jugador = new Jugador2();
  });

  it('Emitira evento cuando recibe daño', () => {
    let nuevoHP = 0;
    jugador.hpCambia.subscribe((hp) => (nuevoHP = hp));

    jugador.recibeDanio(100);
    expect(nuevoHP).toBe(0);
  });

  it('Emitira evento cuando recibe daño y sobrevivir si es menor a 100', () => {
    let nuevoHP = 0;
    jugador.hpCambia.subscribe((hp) => (nuevoHP = hp));

    jugador.recibeDanio(50);
    expect(nuevoHP).toBe(50);
  });
});
