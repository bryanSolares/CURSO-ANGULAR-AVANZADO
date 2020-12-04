// import { Jugador } from './clase';
// describe('Pruebas de Clase', () => {
//   let jugador = new Jugador();

//   beforeAll(() => {});
//   beforeEach(() => {
//     jugador.hp = 100;
//     jugador = new Jugador();
//   });
//   afterAll(() => {});
//   afterEach(() => {});

//   it('Debe retornar 80 de HP si recibe 20 de danio', () => {
//     const resultado = jugador.recibeDanio(20);
//     expect(resultado).toBe(80);
//   });

//   it('Debe retornar 50 de HP si recibe 50 de danio', () => {
//     const resultado = jugador.recibeDanio(50);
//     expect(resultado).toBe(50);
//   });

//   it('Debe retornar 0 de HP si recibe 100 de danio o más', () => {
//     const resultado = jugador.recibeDanio(100);
//     expect(resultado).toBe(0);
//   });

//   it('Debe retornar 0 de HP si recibe danio menor a cero', () => {
//     const resultado = jugador.recibeDanio(-10);
//     expect(resultado).toBe(0);
//   });
// });
