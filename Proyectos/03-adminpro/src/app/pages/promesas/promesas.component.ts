import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuario()
    .then(users => console.log(users))
  }

  getUsuario() {
    return new Promise((resolve, reject)=> {
      fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then(body => resolve(body.data))
      .catch((error) => console.log(error));
    });
  }
}
