import { delay, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../models/hospital.model';

const base_URL = environment.base_URL;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(public http: HttpClient) {}

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

  loadHospitals() {
    return this.http
      .get(`${base_URL}/hospitales`, this.headers)
      .pipe(
        map(
          (response: { ok: boolean; hospitales: Hospital[] }) =>
            response.hospitales
        )
      );
  }
}
