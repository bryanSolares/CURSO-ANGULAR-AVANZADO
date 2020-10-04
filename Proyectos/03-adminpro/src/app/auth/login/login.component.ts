import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm = this.formBuilder.group({
    email: ['1@gmail.com', [Validators.email, Validators.required]],
    password: ['123456', Validators.required],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsuarioService
  ) {}

  login() {
    this.router.navigateByUrl('/');
  }
}
