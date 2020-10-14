import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsers = 0;
  public users: Usuario[] = [];

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    this.userService.loadUsers().subscribe(({ count, users }) => {
      this.totalUsers = count;
      this.users = users;
    });
  }

}
