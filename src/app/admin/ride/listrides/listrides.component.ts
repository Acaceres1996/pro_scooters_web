import { Component, OnInit } from '@angular/core';
import { RideService } from 'src/app/services/ride/ride.service';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-listrides',
  templateUrl: './listrides.component.html',
  styleUrls: ['./listrides.component.scss']
})
export class ListridesComponent implements OnInit {

  Rides : any = [];

  constructor(
    private rideAPI: RideService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.loadRides();
  }

  loadRides(){
    return this.rideAPI.list().subscribe((data: {}) => {
      this.Rides = data;
      console.log();

      this.alertService.clear();
      if(this.Rides.length == 0){
        this.alertService.add(AlertType.warning, "¡No hay viajes!");
      }
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  getStringDate(timestamp){
    return new Date(timestamp * 1000).toLocaleString();
  }

}
