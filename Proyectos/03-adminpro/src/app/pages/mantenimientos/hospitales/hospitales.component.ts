import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from './../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit {
  public load = true;
  public hospitals: Hospital[] = [];

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.load = true;
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.load = false;
    });
  }

  search(text: string) {}

  updateHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe((hospResponse) => {
        console.log(hospResponse);
        Swal.fire('Modifier Success', 'Hospital Modificado con éxito', 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id).subscribe(response => {
      console.log(response);
      this.loadHospitals();
      Swal.fire('Deleted Success', 'Hospital Modificado con éxito', 'success');
    })
  }

  async openModalCreate(){
    const  = await Swal.fire({
      input: 'text'
    })
  }

  changePage(page) {}
}
