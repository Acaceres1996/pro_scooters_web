import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ScooterService } from 'src/app/services/scooter/scooter.service';

@Component({
  selector: 'app-newscooter',
  templateUrl: './newscooter.component.html',
  styleUrls: ['./newscooter.component.scss']
})
export class NewscooterComponent implements OnInit {

  serial: string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private scooterAPI: ScooterService
  ) { }

  ngOnInit() {
  }

  create() {

    this.scooterAPI.newScooter(this.serial).subscribe(result => {
      console.log(result);
      this.router.navigate(['/admin/scooters']);
    }, error => {
      console.log(error.message);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {});
  }
}
