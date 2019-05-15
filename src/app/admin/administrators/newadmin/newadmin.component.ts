import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { Admin } from 'src/app/model/admin/admin';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-newadmin',
  templateUrl: './newadmin.component.html',
  styleUrls: ['./newadmin.component.scss']
})
export class NewadminComponent implements OnInit {

  admin : Admin = new Admin();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private adminAPI: AdminService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
  }

  create() {
    this.adminAPI.create(this.admin).subscribe(result => {
      console.log(result);
      this.alertService.add(AlertType.success, "El administrador ha sido creado.");
      this.router.navigate(['/admin/administrators']);
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {});
  }

}
