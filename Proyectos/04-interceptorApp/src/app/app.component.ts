import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: '';
  constructor(private _userService: UsuariosService) {
    this._userService.getUser().subscribe(
      (data) => {
        console.log(data, '<---- DATA');
      },
      (error) => {
        console.log('Error en app component');
      }
    );
  }
}
