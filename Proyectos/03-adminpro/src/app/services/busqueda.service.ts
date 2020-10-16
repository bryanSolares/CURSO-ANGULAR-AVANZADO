import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

const base_URL = environment.base_URL;

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformUsers(resultados: any[]): Usuario[] {
    return resultados.map(
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
  }

  searchData(type: 'usuarios' | 'medicos' | 'hospitales', term: string) {
    return this.http
      .get<any[]>(`${base_URL}/todo/collection/${type}/${term}`, this.headers)
      .pipe(
        map((response: any) => {
          switch (type) {
            case 'usuarios':
              return this.transformUsers(response.resultados);
            default:
              return [];
          }
        })
      );
  }
}
