import { Component, OnInit } from '@angular/core';
import { ParameterService } from 'src/app/services/parameter/parameter.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listparams',
  templateUrl: './listparams.component.html',
  styleUrls: ['./listparams.component.scss']
})
export class ListparamsComponent implements OnInit {

  Parameters : any = [];
  id : number;

  constructor(
    private paramAPI: ParameterService,
    private modalService: NgbModal,
    private alertService : AlertService,
    private router : Router
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.loadParameters();
  }

  loadParameters(){
    return this.paramAPI.list().subscribe((data: {}) => {
      this.Parameters = data;
      this.alertService.clear();
      if(this.Parameters.length == 0){
        this.alertService.add(AlertType.warning, "¡No hay parametros!");
      }
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  update(id){
    this.router.navigate(['/admin/parameters/update/' + id]);
  }

}
