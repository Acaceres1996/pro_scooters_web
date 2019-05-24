import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-listnotifications',
  templateUrl: './listnotifications.component.html',
  styleUrls: ['./listnotifications.component.scss']
})
export class ListnotificationsComponent implements OnInit {

  Notifications: any = [];

  constructor(
    private NotificationAPI: NotificationsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.loadNotifications();
  }

  loadNotifications() {
    return this.NotificationAPI.list().subscribe(
      (data: {}) => {
        this.Notifications = data;
        console.log(data);
        this.alertService.clear();
        if (this.Notifications.length == 0) {
          this.alertService.add(AlertType.warning, "¡No hay notificaciones!");
        }
      }, error => {
        this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
        console.log(error);
      }
    );
  }

}
