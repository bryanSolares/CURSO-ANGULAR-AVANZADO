import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterForm } from '../interfaces/registerForm.interface';
import { environment } from '../../environments/environment';

const base_URL = environment.base_URL;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_URL}/usuarios/create`, formData);
  }
}
