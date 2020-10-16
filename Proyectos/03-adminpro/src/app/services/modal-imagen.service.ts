import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal = false;

  constructor() {}

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
