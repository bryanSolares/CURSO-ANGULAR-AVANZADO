import { Component, Input, OnInit } from '@angular/core';

import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  @Input() titulo = 'Sin Titulo';
  @Input('labels') public doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  @Input('data') public doughnutChartData: MultiDataSet = [[350, 450, 100]];
  public colors: Color[] = [
    { backgroundColor: ['#6857e6', '#009FEE', '#F02059'] },
  ];

  constructor() {}

  ngOnInit(): void {}
}
