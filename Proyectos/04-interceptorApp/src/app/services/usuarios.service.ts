import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  get headers() {
    const headers = new HttpHeaders({
      'x-token': '123abc',
    });
    return headers;
  }

  getUser() {
    let params = new HttpParams().append('page', '2');
    //params = params.append('apellido', 'solares');

    return this.http
      .get('https://reqresa.in/api/users', {
        params,
      })
      .pipe(
        map((response: any) => response['data'])
        // catchError(this.manejarError)
      );
  }
}
