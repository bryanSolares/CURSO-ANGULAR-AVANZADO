import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  // @Input('valor') progreso: number = 50;
  @Input() progreso = 50;
  @Input() btnClass = 'btn-primary';
  @Output() valor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valor.emit(100);
      return (this.progreso = 100);
    } else if (this.progreso <= 0 && valor <= 0) {
      this.valor.emit(0);
      return (this.progreso = 0);
    }

    this.progreso += valor;
    this.valor.emit(this.progreso);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }
    this.valor.emit(this.progreso);

  }
}
