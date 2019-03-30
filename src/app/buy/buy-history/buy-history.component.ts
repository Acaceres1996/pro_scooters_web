import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { BuyService } from '../../services/buy.service';

@Component({
  selector: 'app-buy-history',
  templateUrl: './buy-history.component.html',
  styleUrls: ['./buy-history.component.scss']
})
export class BuyHistoryComponent implements OnInit {

  @Input() buy: any;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  title = '';

  constructor(
    private loadingService: LoadingService,
    private buyService: BuyService
  ) { }

  ngOnInit() {
    this.title = 'Historia de la Orden ' + this.buy.Id;
  }

  closePopup() {
    this.closeDialog.emit(this.buy);
  }

}
