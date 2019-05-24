import { Component, OnInit } from '@angular/core';
import { Notif } from 'src/app/model/notif/notif';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-newnotification',
  templateUrl: './newnotification.component.html',
  styleUrls: ['./newnotification.component.scss']
})
export class NewnotificationComponent implements OnInit {

  notif : Notif = new Notif();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private NotificationAPI: NotificationsService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
  }

  create() {
    this.NotificationAPI.create(this.notif).subscribe(result => {
      console.log(result);
      this.alertService.add(AlertType.success, "La notificación ha sido creada.");
      this.router.navigate(['/admin/notifications']);
    }, error => {
      this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {}, (reason) => {});
  }
}
