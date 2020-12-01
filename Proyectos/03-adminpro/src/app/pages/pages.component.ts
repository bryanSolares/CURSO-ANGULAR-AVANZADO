import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  year: number = new Date().getFullYear();

  constructor(
    private settingService: SettingService,
    private sideBarService: SidebarService
  ) {}

  ngOnInit(): void {
    customInitFunctions();
    this.sideBarService.cargarMenu();
  }
}
