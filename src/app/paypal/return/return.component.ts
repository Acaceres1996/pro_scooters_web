import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from 'src/app/services/paypal.service';
import { Pair } from 'src/app/classes/pair/pair';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  
  paymentId : string;
  PayerID : string;


  constructor(private activatedRoute: ActivatedRoute, private paypalAPI : PaypalService) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.PayerID = params['PayerID'];
          this.paymentId = params['paymentId'];
      });
  }

  ngOnInit() {
    this.paypalAPI.finishPayment(this.paymentId,this.PayerID).subscribe((data:Pair)=> {
      console.log(data);
    });
  }

}
