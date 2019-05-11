import { Component, OnInit } from '@angular/core';
import { ScooterService } from 'src/app/services/scooter/scooter.service';

@Component({
  selector: 'app-scooters',
  templateUrl: './scooters.component.html',
  styleUrls: ['./scooters.component.scss']
})
export class ScootersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
