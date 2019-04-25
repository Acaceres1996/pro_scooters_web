import { Component, OnInit } from '@angular/core';
import { PaypalService } from '../services/paypal.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  externalURL : string;

  constructor(public PaypalAPI : PaypalService) { }

  ngOnInit() {
  }

  startPaypalPayment(){
    this.PaypalAPI.startPayment().subscribe((data:'')=> {
      this.externalURL = data;
    });
    window.location.href = this.externalURL;
  }
}
