import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { RouterMedicoComponent } from './router-medico.component';
import { Observable, of, Subject } from 'rxjs';
import { from } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class FakeRouter {
  navigate(params: any) {}
}

class FakeActivatedRoute {
  params: Observable<any> = from([{ id: 'nuevo' }]);
}

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        //{ provide: Router, useClase: FakeRouter },
        { provide: ActivatedRoute, useClass: FakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de redireccionar a médico cuando se guarde', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.guardarMedico();
    expect(spy).toHaveBeenCalledWith(['medico', '123']);
  });

  it('Debe de colocar el id = nuevo', () => {
    expect(component.id).toBe('nuevo');
  });
});
