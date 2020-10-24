import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent implements OnInit {
  public img: File;
  public imgTemp = null;

  constructor(
    public modelaImgService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  changeImg(file: File) {
    this.img = file;
    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modelaImgService.cerrarModal();
  }

  uploadImg() {
    const id = this.modelaImgService.id;
    const tipo = this.modelaImgService.tipo;

    this.fileUploadService
      .updatePhoto(this.img, tipo, id)
      .then((imgResponse) => {
        console.log(imgResponse);
        Swal.fire({
          title: 'Update Image',
          text: 'Imagen Modificada con éxito',
          icon: 'success',
        });
        this.modelaImgService.newImg.emit(imgResponse);
        this.cerrarModal();
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se puedo actualizar la imagen',
          icon: 'error',
        });
      });
  }
}
