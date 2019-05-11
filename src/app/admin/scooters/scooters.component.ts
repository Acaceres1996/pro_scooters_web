import { Component, OnInit } from '@angular/core';
import { ScooterService } from 'src/app/services/scooter/scooter.service';

@Component({
  selector: 'app-scooters',
  templateUrl: './scooters.component.html',
  styleUrls: ['./scooters.component.scss']
})
export class ScootersComponent implements OnInit {

  Scooters : any = [];

  constructor(
    private scooterAPI : ScooterService
  ) { }

  ngOnInit() {
    this.loadScooters();
  }

  loadScooters(){
    return this.scooterAPI.getScooters().subscribe((data: {}) => {
      this.Scooters = data;
    })
  }

}
