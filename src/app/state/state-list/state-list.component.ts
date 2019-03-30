import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../../login/login.service';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store';
import { State } from '../../models/state';
import { LoadingService } from '../../services/loading.service';
import { TOASTR_TOKEN } from '../../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {

  storeFG: FormGroup;
  stores: any;
  states:any[] = [];
  loading: Boolean = true;
  currentUser: any;
  currentUserId: any;

  storeIdDefault: number = 0; // 0 al comienzo hasta que filtre por una store.
  tienda: Store;
  tiendas: Store[];

  showEdit:boolean = false;
  editedState: State;

  constructor(private loginService:LoginService,
    private storeService:StoreService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService:LoadingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService) { }

  ngOnInit() {
    this.loadingService.confirmLoading(true);
    this.loading = true;
    this.currentUser = this.loginService.getCurrentUser();
    this.currentUserId = this.currentUser['Id'];

    this.storeFG = new FormGroup(
      {
        storeIdselected: new FormControl('')
      })

    this.loadStores();
    this.loadStates(this.storeIdDefault);
  }

  loadStates(StoreId : number) {
    //
    //tienda en la que estoy parado trabajando.      
    this.storeService.getStore(StoreId).subscribe(tiendaret => {
      this.tienda = tiendaret;
      this.loginService.setTienda(this.tienda);
      //
    });

    this.stateService.getStatesByStore(StoreId).subscribe(result => {
      this.states = result;
      // TODO: castear a Product
      this.loading = false;
      //
      
      this.loadingService.confirmLoading(false);
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
      this.loadingService.confirmLoading(false);
    })
  }

  loadStores() {
    //como si eligiera una store de las que administra
    this.tiendas = this.loginService.getTiendas();
    //
  }

  getStoreIdselected() {
    return this.currentUserId;
  }

  newState() {
    this.router.navigate(['./new'], {relativeTo: this.activatedRoute});
  }

  edit(state) {
    //this.router.navigate(['./edit/' + stateId], {relativeTo: this.activatedRoute});
    this.showEdit = true;
    this.editedState = state;
    
  }

  closeDialog(type:string) {
    this.showEdit = false;

    if (type === 'reload'){
      this.loadStores();
      this.loadStates(this.storeFG.get('storeIdselected').value);
    }
  }

  Update(){

    this.stateService.updateState(this.editedState).subscribe(result => {
      
      this.toastr.success("Estado Actualizado ");
      this.closeDialog('reload');
      
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
      this.loadingService.confirmLoading(false);
    })

  }

  Delete(store){

    this.stateService.deleteState(store).subscribe(result => {
      this.toastr.success("Estado Eliminado ");
      this.closeDialog('reload');
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
      this.loadingService.confirmLoading(false);
    })

  }

}
