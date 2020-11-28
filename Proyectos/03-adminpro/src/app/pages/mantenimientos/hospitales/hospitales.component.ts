import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from './../../../models/hospital.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedaService } from '../../../services/busqueda.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public load = true;
  public hospitals: Hospital[] = [];
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImgService: ModalImagenService,
    private searchService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalImgService.newImg
      .pipe(delay(100))
      .subscribe((newImg) => {
        this.loadHospitals();
      });
  }

  loadHospitals() {
    this.load = true;
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.load = false;
    });
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadHospitals();
    }

    this.load = true;
    this.searchService.searchData('hospitales', term).subscribe((response) => {
      this.hospitals = response;
      this.load = false;
    });
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe((hospResponse) => {
        Swal.fire(
          'Modifier Success',
          'Hospital Modificado con éxito',
          'success'
        );
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id).subscribe((response) => {
      this.loadHospitals();
      Swal.fire('Deleted Success', 'Hospital Modificado con éxito', 'success');
    });
  }

  async openModalCreate() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'Hospital Create',
      text: 'Input name Hospital',
      inputPlaceholder: 'Name Hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((response: any) => {
        this.hospitals.push(response.hospital);
        Swal.fire('Created Success', 'Hospital Creado exitosamente', 'success');
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImgService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  changePage(page) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
