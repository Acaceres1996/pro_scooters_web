import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { LookAndFeelService } from '../services/lookAndFeel.service';
import { ViewChild } from '@angular/core';
import { Store } from '../models/store';
import { StoreService } from '../services/store.service';
import { TOASTR_TOKEN } from '../services/toastr.service';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-tienda-new',
  templateUrl: './tienda-new.component.html',
  styleUrls: ['./tienda-new.component.scss']
})
export class TiendaNewComponent implements OnInit {

  tiendaFG: FormGroup;
  items: any;
  pickPosition: Boolean = false;
  lookAndFeelItems: any;
  @ViewChild('fileInput') fileInputVariable: ElementRef;
  saveDisabled = true;

  constructor(@Inject(TOASTR_TOKEN) private toastr,
      private loadingService: LoadingService,
      private itemService: ItemService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private lookAndFeelService: LookAndFeelService,
      private storeService: StoreService) { }

  ngOnInit() {
    this.tiendaFG = new FormGroup(
      {
        nombre: new FormControl('', Validators.required, this.NotInUseValidatorNewStore.bind(this)),
        descripcion: new FormControl(''),
        mail: new FormControl(''),
        telephone: new FormControl(''),
        url: new FormControl('', Validators.required, this.NotInUseUrlValidatorNewStore.bind(this)),
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required),
        lookAndFeelId: new FormControl('', Validators.required),
        itemId: new FormControl(''),
        logo: new FormControl(''),
        pointsByPesoExchange: new FormControl(''),
        shippingArea: new FormControl(''),
        deliveryTimeAverage: new FormControl(''),
        delivery: new FormControl('')
      });

      this.tiendaFG.statusChanges.subscribe(result => {
          this.saveDisabled = !(this.tiendaFG.dirty && this.tiendaFG.valid);
        });

      this.itemService.getItems().subscribe(result => {
        this.items = result;
      });

      this.lookAndFeelService.getItems().subscribe(result => {
        this.lookAndFeelItems = result;
        console.log(result);
      });
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('Formato incorrecto');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.tiendaFG.get('logo').setValue(reader.result);
    console.log(reader);
  }

  resetLogo() {
    this.fileInputVariable.nativeElement.value = '';
    this.tiendaFG.get('logo').setValue('');
  }

  closeNew() {
    this.router.navigate(['../../dashboard'], {relativeTo: this.activatedRoute});
  }

  saveClicked() {
    const tienda = new Store();
    tienda.Name = this.tiendaFG.get('nombre').value;
    tienda.Description = this.tiendaFG.get('descripcion').value;
    tienda.Mail  = this.tiendaFG.get('mail').value;
    tienda.Telephone  = this.tiendaFG.get('telephone').value;
    tienda.Removed = false;
    tienda.URL  = this.tiendaFG.get('url').value;
    tienda.Latitude  = this.tiendaFG.get('latitude').value;
    tienda.Longitude  = this.tiendaFG.get('longitude').value;
    tienda.LookAndFeelId  = this.tiendaFG.get('lookAndFeelId').value;
    tienda.PointsByPesoExchange = this.tiendaFG.get('pointsByPesoExchange').value;
    tienda.ShippingArea = this.tiendaFG.get('shippingArea').value;
    tienda.AverageShippingDelay = this.tiendaFG.get('deliveryTimeAverage').value;
    tienda.Logo = this.tiendaFG.get('logo').value;
    tienda.ItemId = this.tiendaFG.get('itemId').value;
    tienda.AverageScore = 0;
    tienda.AverageShippingDelay = 10;
    tienda.Delivery = this.tiendaFG.get('delivery').value;

    this.storeService.addStore(tienda).subscribe(result => {
      this.toastr.success('Tienda Guardada');
      this.router.navigate(['../../dashboard'], {relativeTo: this.activatedRoute});
    });

  }

  NotInUseUrlValidatorNewStore(control: AbstractControl) {
    return Observable.timer(400).switchMap(() => {
      return this.storeService.getStoreByUrl(control.value)
          .map(res => {
            let result = null;
            if (res != null) {
              result = { forbiddenName: 'URL en uso'};
              this.tiendaFG.updateValueAndValidity();
              return Observable.of(result);
            }
            this.tiendaFG.updateValueAndValidity();
            return null;
          })
          .catch(res => {
            let result = null;
            if (res.error !== 'Not Found') {
              result = { forbiddenName: 'Error al validar'};
            }
            this.tiendaFG.updateValueAndValidity();
            return Observable.of(result);
          });
      });
  }

  NotInUseValidatorNewStore(control: AbstractControl) {
    return Observable.timer(400).switchMap(() => {
      return this.storeService.validateStoreName(control.value)
          .map(res => {
            let result = null;
            if (res != null) {
              result = { forbiddenName: 'Nombre en uso'};
              this.tiendaFG.updateValueAndValidity();
              return Observable.of(result);
            }
            this.tiendaFG.updateValueAndValidity();
            return null;
          })
          .catch(res => {
            let result = null;
            if (res.error !== 'Not Found') {
              result = { forbiddenName: 'Error al validar'};
            }
            this.tiendaFG.updateValueAndValidity();
            return Observable.of(result);
          });
      });
  }

  openPickPosition() {
    this.pickPosition = true;
  }

  cancelPicker() {
    this.pickPosition = false;
  }
  setNewLocation(e) {
    if (e) {
      this.tiendaFG.get('latitude').setValue(e.coords.latitude);
      this.tiendaFG.get('longitude').setValue(e.coords.longitude);
    }
  }
}
