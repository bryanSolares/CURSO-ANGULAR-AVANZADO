import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormularioRegister {
  form: FormGroup;
  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
