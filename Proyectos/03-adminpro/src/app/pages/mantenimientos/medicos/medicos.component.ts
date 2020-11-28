import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedaService } from '../../../services/busqueda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public load = false;
  private imgSubs: Subscription;

  constructor(
    private medicosService: MedicoService,
    private modalImgService: ModalImagenService,
    private searchService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubs = this.modalImgService.newImg
      .pipe(delay(100))
      .subscribe((newImg) => {
        this.loadDoctors();
      });
  }

  loadDoctors() {
    this.load = true;
    this.medicosService.loadDoctors().subscribe((response) => {
      this.medicos = response;
      this.load = false;
    });
  }

  deleteDoctor(medico: Medico) {
    Swal.fire({
      title: 'Eliminar',
      text: `¿Esta seguro de eliminar a ${medico.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.deleteDoctor(medico._id).subscribe((response) => {
          Swal.fire('Eliminado!', 'Médico Eliminado con Exito', 'success');
          this.loadDoctors();
        });
      }
    });
  }

  abrirModal(medico: Medico) {
    this.modalImgService.abrirModal('medicos', medico._id, medico.img);
  }

  search(term: string = '') {
    if (term.length === 0) {
      return this.loadDoctors();
    }

    this.load = true;
    this.searchService.searchData('medicos', term).subscribe((response) => {
      this.medicos = response;
      this.load = false;
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
