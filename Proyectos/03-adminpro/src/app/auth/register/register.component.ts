import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      conditions: [true, Validators.requiredTrue],
    },
    {
      validators: this.passwordEquals('password', 'password2'),
    }
  );

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsuarioService
  ) {}

  createUser(): void {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.createUser(this.registerForm.value).subscribe(
      (response) => {
        Swal.fire({
          title: 'Bienvenido',
          text: 'Usuario creado Correctamente',
          icon: 'success',
        });
        this.router.navigateByUrl('/');
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.msg,
          icon: 'error',
        });
      }
    );
  }

  fieldInvalid(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSubmitted
      ? true
      : false;
  }

  passwordValid(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    return pass1 !== pass2 && this.formSubmitted ? true : false;
  }

  validConditions(): boolean {
    return !this.registerForm.get('conditions').value && this.formSubmitted;
  }

  passwordEquals(field1: string, field2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(field1);
      const pass2Control = formGroup.get(field2);
      pass1Control.value === pass2Control.value
        ? pass2Control.setErrors(null)
        : pass2Control.setErrors({ noEsIgual: true });
    };
  }
}
