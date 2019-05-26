import { Component, OnInit } from '@angular/core';
import { PaymentsComponent } from '../payments.component';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { AlertService } from 'src/app/alert/alert.service';
import { AlertType } from 'src/app/alert/alert.enum';

@Component({
  selector: 'app-listpayments',
  templateUrl: './listpayments.component.html',
  styleUrls: ['./listpayments.component.scss']
})
export class ListpaymentsComponent implements OnInit {

  Payments : any = [];

  constructor(
    private PaymentsAPI : PaymentService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
    this.alertService.add(AlertType.info, "Cargando...");
    this.loadPayments();
    
  }

  loadPayments(){
    return this.PaymentsAPI.list().subscribe(
      data => {
        console.log(data);
        this.Payments = data;
        this.alertService.clear();
        if(this.Payments.length == 0){
          this.alertService.add(AlertType.warning, "¡No hay pagos!");
        }
      }, error => {
        this.alertService.add(AlertType.error, "Algo ha salido mal. Intentelo de vuelta.");
        console.log(error);
      }
    );
  }

  getStringDate(timestamp) {
    let date = new Date(timestamp);
    return date.toUTCString();
  }

}
