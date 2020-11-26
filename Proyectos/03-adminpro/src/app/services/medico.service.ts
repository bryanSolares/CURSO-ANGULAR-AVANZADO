import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Medico } from '../models/medico.model';
import { environment } from '../../environments/environment';

const base_URL = environment.base_URL;

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
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

  loadDoctors() {
    return this.http
      .get(`${base_URL}/medicos`, this.headers)
      .pipe(
        map((response: { ok: boolean; medicos: Medico[] }) => response.medicos)
      );
  }

  createDoctor(medico: Medico) {
    return this.http.post(
      `${base_URL}/medicos/create`,
      { medico },
      this.headers
    );
  }

  updateDoctor(medico: Medico) {
    return this.http.put(
      `${base_URL}/medicos/update/${medico._id}`,
      { medico },
      this.headers
    );
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${base_URL}/medicos/delete/${id}`, this.headers);
  }
}
