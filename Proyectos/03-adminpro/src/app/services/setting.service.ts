import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    // tslint:disable-next-line: one-variable-per-declaration
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    let btnTheme, currentThemeURL, currentTheme;

    links.forEach((link) => {
      link.classList.remove('working');
      btnTheme = link.getAttribute('data-theme');
      currentThemeURL = `./assets/css/colors/${btnTheme}.css`;
      currentTheme = this.linkTheme.getAttribute('href');

      if (currentThemeURL === currentTheme) {
        link.classList.add('working');
      }
    });
  }
}
