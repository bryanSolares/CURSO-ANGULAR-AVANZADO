import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout();
  }
}
