import { Component, OnInit } from '@angular/core';
import { ScooterService } from 'src/app/services/scooter/scooter.service';

@Component({
  selector: 'app-listscooters',
  templateUrl: './listscooters.component.html',
  styleUrls: ['./listscooters.component.scss']
})
export class ListscootersComponent implements OnInit {

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
