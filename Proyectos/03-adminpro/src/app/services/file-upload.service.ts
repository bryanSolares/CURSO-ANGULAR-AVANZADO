import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const baseURL = environment.base_URL;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatePhoto(
    file: File,
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${baseURL}/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('img', file);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data.msg);
      return data.ok ? data.nameFile : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
