import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  labelG1 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  dataG1 = [[450, 650, 5600]];

  labelG2 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  dataG2 = [[350, 450, 200]];

  labelG3 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  dataG3 = [[333, 135, 100]];

  constructor() {}

  ngOnInit(): void {}
}
