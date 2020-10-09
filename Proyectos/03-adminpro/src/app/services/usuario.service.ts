import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginForm.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_URL = environment.base_URL;
declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${base_URL}/auth/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        }),
        map((response) => true),
        catchError((error) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_URL}/usuarios/create`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_URL}/auth/login`, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_URL}/auth/google/login`, { token }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '200553602789-l3ljm7n4k4op1tc59jhv0h6brir5adps.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
