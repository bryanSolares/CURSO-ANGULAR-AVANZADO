import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.email, Validators.required],
    ],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') || false],
  });

  public auth2: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login(): void {
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem(
            'remember',
            this.loginForm.get('remember').value
          );
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
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

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element): void {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe((response) => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
