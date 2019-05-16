import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScooterService } from 'src/app/services/scooter/scooter.service';
import { AlertService } from 'src/app/alert/alert.service';
import { Scooter } from 'src/app/model/scooter/scooter';
import { AlertType } from 'src/app/alert/alert.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-updatescooter',
  templateUrl: './updatescooter.component.html',
  styleUrls: ['./updatescooter.component.scss']
})
export class UpdatescooterComponent implements OnInit {

  public id : string;
  public scooter : Scooter;

  constructor(
    private route: ActivatedRoute,
    private scooterAPI: ScooterService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.id = this.route.snapshot.paramMap.get('id');
    this.setScooter();
  }

  setScooter() {
    this.scooterAPI.get( this.id ).subscribe( data =>{
      this.scooter = data;
      console.log(this.scooter);
      this.alertService.clear();
    },error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  };

  update() {
    console.log(this.scooter);
    if(!this.scooter.encendido){
      this.scooter.enuso = false;
    }
    this.scooterAPI.update(this.scooter).subscribe(result => {
      console.log(result);
      this.alertService.add(AlertType.success, "El scooter " + result.serial + " ha sido modificado.");
      this.router.navigate(['/admin/scooters']);
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {});
  }

}
