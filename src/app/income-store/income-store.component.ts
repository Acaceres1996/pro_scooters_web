import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../login/login.service';
import { TOASTR_TOKEN } from '../services/toastr.service';
import { StoreService } from '../services/store.service';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyService } from '../services/buy.service';
import { GraphDonut } from '../buy/buy-list/buy-list.component';

@Component({
  selector: 'app-income-store',
  templateUrl: './income-store.component.html',
  styleUrls: ['./income-store.component.scss']
})
export class IncomeStoreComponent implements OnInit {
  constructor(private loginService: LoginService,
    private storeService: StoreService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private buyService: BuyService) { }

    buys: any[] = [];
    results: any[] = [];
    resultsByTotal: any[] = [];
    resultsByCantidad: any[] = [];
    loading = false;

    colors = [ '#c5d95c', '#99c86a', '#5cb45c', '#5cc9c8', '#6dc3ec',
    '#5c8ff5', '#a05cff', '#c85cff', '#f8a5e1', '#e65ca5', '#c35c73',
    '#ee685c'];

  ngOnInit() {
    this.loadingService.confirmLoading(true);
    const user = this.loginService.getCurrentUser();
    this.buyService.getBuysByAdmin(user.Id).subscribe(result => {
      this.buys = result;
      this.buys = this.buys.filter(x => x.StateId === 5);

      this.buys.forEach(x => {
        let gd = this.results.find(b => b.StoreName === x.StoreName);
        if (!gd) {
          gd = {};
          gd.StoreName = x.StoreName;
          gd.TotalValue = x.TotalValue;
          gd.Total = 1;
          this.results.push(gd);
        } else {
          gd.Total = gd.Total + 1;
          gd.TotalValue = gd.TotalValue + x.TotalValue;
        }
      });
      this.updateGraphValues();
      this.loadingService.confirmLoading(false);
    }, error => {
      this.toastr.error(error.message);
      this.loadingService.confirmLoading(false);
    });
  }

  updateGraphValues() {
    this.results.forEach(x => {
      let gd = this.resultsByTotal.find(b => b.name === x.StoreName);
      if (!gd) {
        gd = new GraphDonut();
        gd.name = x.StoreName;
        gd.y = x.TotalValue;
        gd.color = this.getColor();
        this.resultsByTotal.push(gd);
      } else {
        gd.y = gd.y + x.TotalValue;
      }
    });
  }

  getColor() {
    return this.colors[this.resultsByTotal.length];
  }
}
