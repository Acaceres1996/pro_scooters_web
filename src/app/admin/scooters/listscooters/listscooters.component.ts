import { Component, OnInit } from '@angular/core';
import { ScooterService } from 'src/app/services/scooter/scooter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listscooters',
  templateUrl: './listscooters.component.html',
  styleUrls: ['./listscooters.component.scss']
})
export class ListscootersComponent implements OnInit {

  Scooters : any = [];
  id : number;

  constructor(
    private scooterAPI : ScooterService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadScooters();
  }

  delete(){
    return this.scooterAPI.deleteScooter(this.id).subscribe((data: {}) => {
      console.log(data);
    })
  }

  loadScooters(){
    return this.scooterAPI.getScooters().subscribe((data: {}) => {
      this.Scooters = data;
    })
  }

  open(content,id) {
    this.id = id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {});
  }
}
