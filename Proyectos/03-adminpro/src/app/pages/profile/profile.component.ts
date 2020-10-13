import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: Usuario;
  public img: File;
  public imgTemp = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe(
      (response) => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire({
          title: 'Update User',
          text: 'Usuario modificado con éxito',
          icon: 'success',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.msg,
          icon: 'error',
        });
      }
    );
  }

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

  uploadImg() {
    this.fileUploadService
      .updatePhoto(this.img, 'usuarios', this.user.uid)
      .then((imgResponse) => {
        console.log(imgResponse);
        Swal.fire({
          title: 'Update Image',
          text: 'Imagen Modificada con éxito',
          icon: 'success',
        });
        this.user.img = imgResponse;
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
