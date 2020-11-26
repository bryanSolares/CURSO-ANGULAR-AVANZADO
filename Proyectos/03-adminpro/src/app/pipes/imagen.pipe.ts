import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_URL = environment.base_URL;

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, type: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return `${base_URL}/uploads/${type}/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else {
      return `${base_URL}/uploads/${type}/${img}`;
    }
  }
}
