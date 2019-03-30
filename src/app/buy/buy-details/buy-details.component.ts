import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { TOASTR_TOKEN } from '../../services/toastr.service';
import { LoadingService } from '../../services/loading.service';
import { BuyService } from '../../services/buy.service';

@Component({
  selector: 'app-buy-details',
  templateUrl: './buy-details.component.html',
  styleUrls: ['./buy-details.component.scss']
})
export class BuyDetailsComponent implements OnInit {

  @Input() buy: any;
  @Input() states: any[];
  selectedValue: any;
  selectedPreviousValue: any;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  constructor(private alertService: AlertService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService: LoadingService,
    private buyService: BuyService) { }

  title = '';
  ngOnInit() {
    this.title = 'Orden ' + this.buy.Id;
    this.selectedValue = this.buy.StateId;
    this.selectedPreviousValue = this.buy.StateId;
  }

  closePopup() {
    this.closeDialog.emit(this.buy);
  }

  getDateDifference(date) {
    if (! date) {
      return '';
    }

    const date1 = new Date(date).getTime();
    const date2 = new Date().getTime();

    const msec = (date2 + 10800000) - date1;
    const mins = Math.floor(msec / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    const yrs = Math.floor(days / 365);

    if (mins < 60 ) {
      return ` ${mins} minutos `;
    }

    if (hrs < 24 ) {
      return ` ${hrs} horas `;
    }

    if (days < 365 ) {
      return ` ${days} dias `;
    }

      return ` ${yrs} años `;
  }

  changeBuyState() {
    this.buyService.changeState(this.buy.Id, this.selectedValue).subscribe(result => {
      this.buy.StateId = this.selectedValue;
      this.selectedPreviousValue = this.selectedValue;
      this.toastr.success('Estado Actualizado');
    }, error => {
      this.selectedValue = this.selectedPreviousValue;
      this.toastr.error(error.message);
    });
  }

  changeBuyStateConfirm() {
    const state = this.states.find(x => x.Id.toString() === this.selectedValue);
    const that = this;
    this.alertService.confirm('Desea Cambiar el Estado a ' + state.Name, function () {
      that.changeBuyState();
    }, function () {
      that.selectedValue = that.selectedPreviousValue;
    });
  }
}
