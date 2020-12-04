import { FormularioRegister } from './formulario';
import { FormBuilder } from '@angular/forms';
describe('Validando formularios', () => {
  let componente: FormularioRegister;
  beforeEach(() => (componente = new FormularioRegister(new FormBuilder())));

  it('Debe crear un formulario con dos campos', () => {
    expect(componente.form.contains('email')).toBeTruthy();
    expect(componente.form.contains('password')).toBeTruthy();
  });

  it('Email deberá ser obligatorio', () => {
    const campo = componente.form.get('email');
    campo.setValue('');
    expect(campo.valid).toBeFalsy();
  });

  it('Email deberá ser válido', () => {
    const campo = componente.form.get('email');
    campo.setValue('s@outlook.com');
    expect(campo.valid).toBeTruthy();
  });
});
