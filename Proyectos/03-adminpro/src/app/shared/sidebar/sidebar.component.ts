import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public user: Usuario;

  constructor(
    public sideBarService: SidebarService,
    private userService: UsuarioService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {}
}
