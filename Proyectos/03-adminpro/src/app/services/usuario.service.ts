import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginForm.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

import { UsersLoad } from '../interfaces/usuarios.load.interface';

const base_URL = environment.base_URL;
declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public user: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | string {
    return this.user.role;
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_URL}/auth/renew`, this.headers).pipe(
      map((response: any) => {
        const { email, google, name, role, uid, img } = response.user;
        this.user = new Usuario(name, email, null, img, google, uid, role);
        this.saveLocalStorage(response.token, response.menu);
        return true;
      }),
      catchError((error) => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_URL}/usuarios/create`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response.token, response.menu);
      })
    );
  }

  updateUser(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.user.role,
    };

    return this.http.put(
      `${base_URL}/usuarios/update/${this.uid}`,
      data,
      this.headers
    );
  }

  updateRole(user: Usuario) {
    return this.http.put(
      `${base_URL}/usuarios/update/${user.uid}`,
      user,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_URL}/auth/login`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response.token, response.menu);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_URL}/auth/google/login`, { token }).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response.token, response.menu);
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
    this.clearStorage();
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  loadUsers(desde?: number) {
    return this.http
      .get<UsersLoad>(
        `${base_URL}/usuarios?desde=${desde}&limit=5`,
        this.headers
      )
      .pipe(
        delay(500),
        map((response) => {
          console.log(response);
          const usuarios = response.users.map(
            (user) =>
              new Usuario(
                user.name,
                user.email,
                user.password,
                user.img,
                user.google,
                user.uid,
                user.role
              )
          );
          return {
            count: response.count,
            users: usuarios,
          };
        })
      );
  }

  deleteUser(uid: string) {
    return this.http.delete(`${base_URL}/usuarios/delete/${uid}`, this.headers);
  }

  saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  clearStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
  }
}
