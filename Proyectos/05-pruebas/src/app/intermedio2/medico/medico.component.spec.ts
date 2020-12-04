import { MedicoComponent } from './medico.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MedicoService } from './medico.service';
import { HttpClientModule } from '@angular/common/http';

describe('Medico Component', () => {
  let componente: MedicoComponent;
  let fixture: ComponentFixture<MedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicoComponent],
      providers: [MedicoService],
      imports: [HttpClientModule],
    });

    fixture = TestBed.createComponent(MedicoComponent);
    componente = fixture.componentInstance;
  });

  it('Debe de crearse el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('Debe de retornar el nombre del médico', () => {
    const nombre = 'Solares';
    const resultado = componente.saludarMedico(nombre);
    expect(resultado).toContain(nombre);
  });
});
