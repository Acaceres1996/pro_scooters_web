import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LoginService } from '../login/login.service';
import { } from '@types/googlemaps';
import { StoreService } from '../services/store.service';
import { Store } from '../models/store';
import { LoadingService } from '../services/loading.service';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';
import { TOASTR_TOKEN } from '../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LookAndFeelService } from '../services/lookAndFeel.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  user: any;
  tienda: Store;
  tiendas: Store[];
  loading:boolean = true;
  tiendaFG: FormGroup;

  tiendaEdit: Store;
  showEdit: Boolean = false;

  lookAndFeelItems: any;


  constructor(private loginService:LoginService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService:LoadingService,
    private itemService:ItemService,
    private storeService:StoreService,
    private activatedRoute: ActivatedRoute,
    private lookAndFeelService: LookAndFeelService,
    private router: Router) { }

  ngOnInit() {

    this.tiendaFG = new FormGroup(
      {
        lookAndFeelId: new FormControl('', Validators.required),
      });

    this.loadingService.confirmLoading(true);
    // this.user = this.loginService.getSocialUser();
    // this.user = {};
    // this.user.storeId = 0;
    this.getMisTiendas();
    
  }


  getMisTiendas() {
    let user = this.loginService.getCurrentUser();
      this.storeService.getStoresByUser(user.Id).subscribe(result => {
        this.tiendas = result;
        this.loginService.setTiendas(result);
        this.loading = false;
        this.loadingService.confirmLoading(false);
      }, error => {
        this.toastr.error(error.message);
        this.loadingService.confirmLoading(false);
      });
  }

  Update() {
    this.tiendaEdit.LookAndFeelId = this.tiendaFG.get('lookAndFeelId').value;
    this.storeService.updateStore(this.tiendaEdit).subscribe(result => {
      this.closeDialog('reload');
      this.toastr.success('Tienda Actualizada correctamente');
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    });
  }

  Delete() {
    this.storeService.deleteStore(this.tiendaEdit).subscribe(result => {
      this.closeDialog('reload');
      this.toastr.success('Tienda Eliminada correctamente');
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    });
  }

    edit(tienda) {
      this.tiendaEdit = tienda;
      this.lookAndFeelService.getItems().subscribe(result => {
        this.lookAndFeelItems = result;
        console.log(result);
      });

      this.tiendaFG.get('lookAndFeelId').setValue(this.tiendaEdit.LookAndFeelId);
      this.showEdit = true;
    }
  
    closeDialog(type:string) {
      this.showEdit = false;
  
      if (type === 'reload'){
        this.getMisTiendas();
      }
    }

  setMarker(tienda){

    var mapProp = {
      center: new google.maps.LatLng(tienda.Latitude, tienda.Longitude),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(tienda.Latitude, tienda.Longitude),
      map: this.map,
      title: tienda.name
    });

  }

  newTienda(){
    this.router.navigate(['../tienda/new'], {relativeTo: this.activatedRoute});
  }
  
}
