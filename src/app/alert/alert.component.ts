import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  message: any;
  constructor(
    private alertService: AlertService,
 ) { }
 ngOnInit() {
    this.alertService.getMessage().subscribe(message => {

      this.message = message;
    });
  }
}
