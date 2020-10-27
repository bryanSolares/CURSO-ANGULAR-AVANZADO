import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';

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

  deleteHospital(hospital) {}

  changePage(page) {}
}
