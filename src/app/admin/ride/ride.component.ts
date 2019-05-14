import { Component, OnInit } from '@angular/core';
import { RideService } from 'src/app/services/ride/ride.service';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  Rides : any = [];

  constructor(
    private rideAPI : RideService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
  }

}
