import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseURL = environment.base_URL;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  public newImg: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${baseURL}/uploads/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
