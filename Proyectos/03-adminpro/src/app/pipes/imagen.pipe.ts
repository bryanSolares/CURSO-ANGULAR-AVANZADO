import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_URL = environment.base_URL;

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, type: 'usuarios' | 'medicos' | 'hospitales'): string {
    return img
      ? `${img.includes('https')}`
      : img
      ? `${base_URL}/uploads/${type}/${img}`
      : `${base_URL}/uploads/${type}/no-image`;
  }
}
