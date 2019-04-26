import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from 'src/app/services/paypal.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  
  constructor(private activatedRoute: ActivatedRoute, private paypalAPI : PaypalService) {
    this.activatedRoute.queryParams.subscribe(params => {
          let PayerID = params['PayerID'];
          let paymentId = params['paymentId'];

          this.paypalAPI.finishPayment(paymentId,PayerID);
      });
  }

  ngOnInit() {
  }

}
