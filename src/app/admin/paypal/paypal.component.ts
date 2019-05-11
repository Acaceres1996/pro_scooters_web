import { Component, OnInit } from '@angular/core';
import { PaypalService } from '../../services/paypal/paypal.service';
import { Pair } from '../../model/pair/pair';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  constructor(public PaypalAPI : PaypalService) { }

  ngOnInit() {
  }

  startPaypalPayment(){
    this.PaypalAPI.startPayment().subscribe((data:Pair)=> {
      window.location.href = data.value;
    });
  }
}
