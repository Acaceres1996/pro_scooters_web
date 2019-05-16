import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ScooterService } from 'src/app/services/scooter/scooter.service';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';

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
    private scooterAPI: ScooterService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
  }

  create() {
    this.scooterAPI.create(this.serial).subscribe(result => {
      console.log(result);
      this.alertService.add(AlertType.success, "El scooter " + this.serial + " ha sido creado.");
      this.router.navigate(['/admin/scooters']);
    }, error => {
      console.log(error);
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {});
  }
}
