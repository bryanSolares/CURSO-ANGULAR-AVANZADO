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
        { title: 'Promise', url: 'promise', icon: '' },
        { title: 'Grafics', url: 'chart1', icon: '' },
        { title: 'Rxjs', url: 'rxjs', icon: '' },
      ],
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        { title: 'Usuarios', url: 'usuarios', icon: '' },
        { title: 'Hospitales', url: 'hospitales', icon: '' },
        { title: 'Medicos', url: 'medicos', icon: '' },
      ],
    },
  ];

  constructor() {}
}
