import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de tener un link a la página de médicos', () => {
    const elementos = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );
    console.log(elementos);
    let existe = false;
    elementos.forEach((e) => {
      if (e.attributes['routerLink'] === '/medicos') {
        existe = true;
      }
    });

    expect(existe).toBeTrue();
  });
});
