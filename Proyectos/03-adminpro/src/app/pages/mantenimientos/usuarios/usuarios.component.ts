import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BusquedaService } from '../../../services/busqueda.service';
import { UsuarioService } from '../../../services/usuario.service';

import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsers = 0;
  public users: Usuario[] = [];
  public userTemp: Usuario[] = [];
  public desde = 0;
  public load = true;
  public imgSubs: Subscription;

  constructor(
    private userService: UsuarioService,
    private searchService: BusquedaService,
    private modalImgService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImgService.newImg
      .pipe(delay(100))
      .subscribe((newImg) => {
        this.loadUsers();
      });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadUsers() {
    this.load = true;
    this.userService.loadUsers(this.desde).subscribe(({ count, users }) => {
      this.totalUsers = count;
      this.users = users;
      this.userTemp = users;
      this.load = false;
    });
  }

  changePage(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsers) {
      this.desde -= valor;
    }

    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      return (this.users = this.userTemp);
    }

    this.load = true;
    this.searchService.searchData('usuarios', term).subscribe((response: Usuario[]) => {
      this.users = response;
      this.load = false;
    });
  }

  deleteUser(user: Usuario) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puede eliminarse a sí mismo', 'info');
    }

    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro de eliminar a ${user.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid).subscribe((response) => {
          Swal.fire('Eliminado!', 'Usuario Eliminado con Exito', 'success');
          this.loadUsers();
        });
      }
    });
  }

  changeRole(user: Usuario): void {
    this.userService.updateRole(user).subscribe((response) => {
      console.log(response);
    });
  }

  abrirModal(user: Usuario): void {
    this.modalImgService.abrirModal('usuarios', user.uid, user.img);
  }
}
