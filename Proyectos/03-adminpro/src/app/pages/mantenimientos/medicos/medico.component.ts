import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { HospitalService } from '../../../services/hospital.service';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.loadMedico(id));

    this.medicoForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe((hospitalID) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalID
      );
    });
  }

  loadMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService
      .getDoctorById(id)
      .pipe(delay(100))
      .subscribe(
        (medico) => {
          if (!medico) {
            return this.router.navigate(['/dashboard', 'medicos']);
          }
          const {
            name,
            hospital: { _id },
          } = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({ name, hospital: _id });
        },
        (error) => {
          return this.router.navigate(['/dashboard', 'medicos']);
        }
      );
  }

  cargarHospitales() {
    this.hospitalService.loadHospitals().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  guardarMedico() {
    const { name } = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.updateDoctor(data).subscribe((response) => {
        console.log(response);
        Swal.fire(
          'Modificación',
          `${name} actualizado correctamente.`,
          'success'
        );
      });
    } else {
      this.medicoService
        .createDoctor(this.medicoForm.value)
        .subscribe((response: any) => {
          Swal.fire('Creación', `${name} creado correctamente.`, 'success');
          this.router.navigate(['/dashboard', 'medico', response.medico._id]);
        });
    }
  }
}
