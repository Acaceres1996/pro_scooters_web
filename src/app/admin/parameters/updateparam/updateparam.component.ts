import { Component, OnInit } from '@angular/core';
import { Parameter } from 'src/app/model/parameter/parameter';
import { ParameterService } from 'src/app/services/parameter/parameter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-updateparam',
  templateUrl: './updateparam.component.html',
  styleUrls: ['./updateparam.component.scss']
})
export class UpdateparamComponent implements OnInit {

  public id : string;
  public parameter : Parameter = new Parameter();

  constructor(
    private route: ActivatedRoute,
    private paramAPI: ParameterService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.id = this.route.snapshot.paramMap.get('id');
    this.setParam();
  }

  setParam(){
    this.paramAPI.get( this.id ).subscribe( data =>{
      this.parameter = data;
      console.log(this.parameter);
      this.alertService.clear();
    },error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  update() {
    console.log(this.parameter);
    this.paramAPI.update(this.parameter).subscribe(result => {
      console.log(result);
      this.alertService.add(AlertType.success, "El parametro " + result.nombre + " ha sido modificado.");
      this.router.navigate(['/admin/parameters']);
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {});
  }

}
