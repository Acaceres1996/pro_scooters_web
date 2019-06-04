import { Component, OnInit, PipeTransform } from '@angular/core';
import { ScooterService } from 'src/app/services/scooter/scooter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-listscooters',
  templateUrl: './listscooters.component.html',
  styleUrls: ['./listscooters.component.scss']
})
export class ListscootersComponent implements OnInit {

  Scooters: any = [];
  id: number;
  filter: String;

  constructor(
    private scooterAPI: ScooterService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router,
    private registerAPI: RegisterService
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.loadScooters();
  }
  loadScooters() {
    return this.scooterAPI.list().subscribe((data: {}) => {
      this.Scooters = data;
      for (let i = 0; i < this.Scooters.length; i++) {
        this.registerAPI.getScooterInfo(this.Scooters[i].id).subscribe((data: {}) => {
          this.Scooters[i].scooterhistorico = data;
        }, error => {
          this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
          console.log(error);
        });
      }
      this.alertService.clear();
      console.log(this.Scooters);
      if (this.Scooters.length == 0) {
        this.alertService.add(AlertType.warning, "¡No hay scooters!");
      }
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }


  view(id) {
    this.router.navigate(['/admin/scooters/view/' + id]);
  }

  update(id) {
    this.router.navigate(['/admin/scooters/update/' + id]);
  }

  delete() {
    return this.scooterAPI.delete(this.id).subscribe((data: {}) => {
      console.log(data);      
      this.ngOnInit();
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  open(content, id, encendido) {
    if (encendido) {
      this.alertService.add(AlertType.error, "El scooter debe estar apagado para poder ser eliminado.")
    } else {
      this.id = id;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
    }
  }
}
