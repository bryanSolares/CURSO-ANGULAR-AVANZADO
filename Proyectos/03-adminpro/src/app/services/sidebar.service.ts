import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Main', url: '/', icon: '' },
        { title: 'Progress Bar', url: 'progress', icon: '' },
        { title: 'Grafics', url: 'chart1', icon: '' },
      ],
    },
  ];

  constructor() {}
}
