import { Component, OnInit } from '@angular/core';

import { SidebarService } from "../../services/sidebar.service";
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public user: Usuario;

  constructor(
    private sideBarService: SidebarService,
    private userService: UsuarioService
  ) {
    this.menuItems = sideBarService.menu;
    this.user = userService.user;
  }

  ngOnInit(): void {}
}
