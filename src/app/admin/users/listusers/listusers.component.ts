import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss']
})
export class ListusersComponent implements OnInit {

  Users: any = [];

  constructor(
    private userAPI: UserService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.loadUsers();
  }

  loadUsers() {
    return this.userAPI.list().subscribe((data: {}) => {
      this.Users = data;
      this.alertService.clear();
      if (this.Users.length == 0) {
        this.alertService.add(AlertType.warning, "¡No hay usuarios!");
      }
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

}
