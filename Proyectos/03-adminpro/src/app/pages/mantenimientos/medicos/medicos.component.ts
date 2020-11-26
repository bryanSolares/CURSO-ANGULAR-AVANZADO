import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = [];
  public load = false;
  private imgSubs: Subscription;

  constructor(
    private medicosService: MedicoService,
    private modalImgService: ModalImagenService
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

  updateDoctor(medico: Medico) {}

  deleteDoctor(medico: Medico) {}

  abrirModal(medico: Medico) {
    this.modalImgService.abrirModal('medicos', medico._id, medico.img);
  }

  search(term: string) {}
}
