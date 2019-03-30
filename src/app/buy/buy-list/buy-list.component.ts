import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../../login/login.service';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store';
import { LoadingService } from '../../services/loading.service';
import { TOASTR_TOKEN } from '../../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BuyService } from '../../services/buy.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.scss']
})
export class BuyListComponent implements OnInit, OnDestroy {

  storeFG: FormGroup;
  stores: any;
  buy: any;
  buys: any[] = [];
  loading: Boolean = true;
  currentUser: any;
  currentUserId: any;
  listFilterValue: string;
  listFilterSubject = new Subject<string>();
  listFilterBuyValue: string;
  listFilterBuySubject = new Subject<string>();
  filteringBuy: Boolean = false;
  storeIdDefault = 0; // 0 al comienzo hasta que filtre por una store.
  tienda: Store;
  tiendas: Store[];
  tiendasOrigin: Store[];
  expandCollapse = false;
  showDetails = false;
  updateBuySubscription: Subscription;
  states = [];
  buysByState: GraphDonut[] = [];
  showMore = false;
  pageSize = 10;
  pageNumber = 1;

  colors = [ '#c5d95c', '#99c86a', '#5cb45c', '#5cc9c8', '#6dc3ec',
  '#5c8ff5', '#a05cff', '#c85cff', '#f8a5e1', '#e65ca5', '#c35c73',
  '#ee685c'];

  ngOnDestroy(): void {
    if (this.updateBuySubscription) {
      this.updateBuySubscription.unsubscribe();
    }
  }

  constructor(private loginService: LoginService,
    private storeService: StoreService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private buyService: BuyService) { }

  ngOnInit() {
    this.loadingService.confirmLoading(true);
    this.loading = true;
    this.currentUser = this.loginService.getCurrentUser();
    this.currentUserId = this.currentUser['Id'];

    this.loadStores();
    this.states = this.loginService.getStates();
    this.listFilterSubject.debounceTime(400).subscribe(term => {
      this.tiendas = this.performFilter(term);
    });

    this.listFilterBuySubject.debounceTime(400).subscribe(term => {
      if (!this.loading) {
        this.pageNumber = 1;
        this.loadBuys(this.tienda.Id, false);
      }
    });

    this.updateBuySubscription = this.buyService.updateBuyList$.subscribe(result => {
      this.filteringBuy = true;
      this.loadBuys(this.tienda.Id, false);
    });

    this.updateGraphValues();
  }

  loadBuys(StoreId: number, getStores = true ) {

    if (getStores) {
      this.storeService.getStore(StoreId).subscribe(tiendaret => {
        this.tienda = tiendaret;
        this.filteringBuy = false;
        this.loginService.setTienda(this.tienda);
      });
    }

    this.loadingService.confirmLoading(true);
    this.buyService.getBuysByStore(StoreId, this.pageNumber, this.pageSize, this.listFilterBuyValue).subscribe(result => {
      this.buys = result.items;
      if (this.pageNumber >= result.totalPages) {
        this.showMore = false;
      } else {
        this.showMore = true;
      }

      this.updateGraphValues();
      this.loadingService.confirmLoading(false);
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
      this.loadingService.confirmLoading(false);
    });
  }

  loadStores() {
    this.tiendas = this.loginService.getTiendas();
    this.tiendasOrigin = this.tiendas;
    this.loadBuys(this.tiendas[0].Id);
  }

  getStoreIdselected() {
    return this.currentUserId;
  }

  edit(buyId) {
    this.router.navigate(['./edit/' + buyId], {relativeTo: this.activatedRoute});
  }

  set filterWord(value: string) {
    this.listFilterValue = value;
    this.listFilterSubject.next(value);
  }

  get filterWord(): string {
    return this.listFilterValue;
  }

  set filterBuys(value: string) {
    this.listFilterBuyValue = value;
    this.listFilterBuySubject.next(value);
  }

  get filterBuys(): string {
    return this.listFilterBuyValue;
  }

  setFilterBuy(filterWord) {
    this.listFilterBuyValue = filterWord;
  }

  clearBuyTextBox() {
    this.filterBuys = '';
  }

  setFilterWord(filterWord) {
    this.listFilterValue = filterWord;
  }

  clearTextBox() {
    this.filterWord = '';
  }

  performFilter(filterBy) {
    filterBy = filterBy.toLocaleLowerCase();
    if (filterBy === '') {
      return this.tiendasOrigin;
    }

    return this.tiendasOrigin.filter(
      (item) =>
        item.Name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  expand() {
    this.expandCollapse = !this.expandCollapse;
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

  editBuy(buy) {
    this.buy = buy;
    this.showDetails = true;
  }

  closeDialog(buy) {
    this.showDetails = false;
    // actualizar estados
    this.updateStatesAndGraph(buy);
  }

  updateStatesAndGraph(buy) {
    const buyTemp = this.buys.find(x => x.Id === buy.Id);
    buyTemp.StateId = buy.StateId;
    buyTemp.StateName = this.states.find(x => x.Id === buy.StateId).Name;
    this.updateGraphValues();
  }

  updateGraphValues() {
    this.buysByState = [];
    this.buys.forEach(x => {
      let gd = this.buysByState.find(b => b.name === x.StateName);
      if (!gd) {
        gd = new GraphDonut();
        gd.name = x.StateName;
        gd.y = 1;
        gd.color = this.getColor();
        this.buysByState.push(gd);
      } else {
        gd.y = gd.y + 1;
      }
    });
  }

  getColor() {
    return this.colors[this.buysByState.length];
  }

  getGraphColor(stateName) {
    const gd = this.buysByState.find(b => b.name === stateName);
    if (gd) {
      return gd.color;
    }

    return this.colors[5];
  }

  showMoreBuys() {
    this.loadingService.confirmLoading(true);
    this.pageNumber = this.pageNumber + 1;
    this.buyService.getBuysByStore(this.tienda.Id, this.pageNumber, this.pageSize, this.listFilterBuyValue).subscribe(result => {
      this.buys = this.buys.concat(result.items);
      if (this.pageNumber >= result.totalPages) {
        this.showMore = false;
      } else {
        this.showMore = true;
      }

      this.updateGraphValues();
      this.loadingService.confirmLoading(false);
      this.loading = false;
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
      this.loadingService.confirmLoading(false);
    });
  }
}

export class GraphDonut {
  name: string;
  y: number;
  color: string;
}
