import { Component, OnInit } from '@angular/core';

import { ModalImagenService } from "../../services/modal-imagen.service";

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  constructor(public modelaImgService: ModalImagenService) {}

  ngOnInit(): void {}

  cerrarModal(){
    this.modelaImgService.cerrarModal();
  }
}
