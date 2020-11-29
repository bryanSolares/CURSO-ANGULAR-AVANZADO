import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public user: Usuario;

  constructor(private userService: UsuarioService, private router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {}

  search(termino: string) {
    if (termino.length === 0) {
      return;
    }
    this.router.navigate(['/dashboard', 'buscar', termino]);
  }

  logout(): void {
    this.userService.logout();
  }
}
