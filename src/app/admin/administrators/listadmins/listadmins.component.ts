import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/alert.service';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/alert/alert.enum';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-listadmins',
  templateUrl: './listadmins.component.html',
  styleUrls: ['./listadmins.component.scss']
})
export class ListadminsComponent implements OnInit {

  Admins : any = [];

  constructor(
    private adminAPI: AdminService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.loadAdmins();
  }

  loadAdmins(){
    return this.adminAPI.list().subscribe((data: {}) => {
      this.Admins = data;
      console.log(data);
      this.alertService.clear();
      if (this.Admins.length == 0) {
        this.alertService.add(AlertType.warning, "¡No hay administradores!");
      }
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

}
