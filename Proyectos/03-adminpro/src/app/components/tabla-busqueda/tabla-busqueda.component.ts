import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-busqueda',
  templateUrl: './tabla-busqueda.component.html',
  styles: [],
})
export class TablaBusquedaComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() titulo = '';
  @Input() tipoArreglo = '';
  @Output() navegarRuta = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  navegar(id: string) {
    this.navegarRuta.emit(id);
  }
}
