import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterLink, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { NavbarComponent } from './avanzado/navbar/navbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent /*, NavbarComponent*/],
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pruebas'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pruebas');
  });

  it('Debe de tener un RouterOutlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debuElement = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(debuElement).not.toBeNull();
  });
});
