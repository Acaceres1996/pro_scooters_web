import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../../login/login.service';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store';
import { LoadingService } from '../../services/loading.service';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { TOASTR_TOKEN } from '../../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/producto.service';
import { debug } from 'util';
import { Product } from '../../models/product';
import { Property } from '../../models/property';
import { PropertyValue } from '../../models/propertyvalue';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  storeFG: FormGroup;
  products:any[] = [];
  loading: Boolean = true;
  currentUser: any;
  currentUserId: any;
  showEdit: Boolean = false;

  showNewProp: Boolean = false;
  newNameProp: string = '';
  newPropValue: string = '';

  propertyAndValues:any[] = [];
  
  showViewProp: Boolean = false;

  //hardcoded
  storeIdDefault: number = 0; // 0 al comienzo hasta que filtre por una store.
  tienda: Store;
  tiendas: Store[];

  productEdit: Product;

  constructor(private loginService:LoginService,
    private storeService:StoreService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService:LoadingService,
    private itemService:ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

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
    this.loadProducts(this.storeIdDefault);
  }

  loadProducts(StoreId : number) {

    //tienda en la que estoy parado trabajando.      
          this.storeService.getStore(StoreId).subscribe(tiendaret => {
            this.tienda = tiendaret;
            this.loginService.setTienda(this.tienda);

          });

          
    this.productService.getProductsByStore(StoreId).subscribe(result => {
      this.products = result;
      // TODO: castear a Product
      this.loading = false;
      
      this.loadingService.confirmLoading(false);
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
      this.loadingService.confirmLoading(false);
    })


  }


  Update(){
    this.loadingService.confirmLoading(true);

    this.productService.updateProduct(this.productEdit).subscribe(result => {
      this.closeDialog('reload');
      this.toastr.success("Producto Actualizado correctamente");
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;

    })
    this.loadingService.confirmLoading(false);
  }

  addProp(product){
    this.showNewProp = true;
    this.newNameProp = '';
    this.newPropValue = '';
    this.productEdit = product;
  }

  viewProp(product){
    this.loadingService.confirmLoading(true);
    this.showViewProp = true;

    this.productService.getPropertyValue(product).subscribe(result => {

      this.propertyAndValues = result;


      this.loadingService.confirmLoading(false);
    })

  }

  addPropandValues(){
    this.loadingService.confirmLoading(true);
    let property = new Property();
    property.Id = 0;
    property.Name = this.newNameProp;
    property.ProductId = this.productEdit.Id;
    property.Removed = false;


    this.productService.addProperty(property).subscribe(result => {

      var values = this.newPropValue.split(',');
            

      for (let value of values) {
          let propertyValue = new PropertyValue();
          propertyValue.Id = 0;
          propertyValue.PropertyId = result.Id;
          propertyValue.Value = value;
          this.productService.addPropertyValue(propertyValue).subscribe(result => {

          })
      }

      this.toastr.success("Propiedad Agregada correctamente");
      this.loadingService.confirmLoading(false);
      this.closeDialog('');
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
      this.loadingService.confirmLoading(false);
      this.closeDialog('');
    })

  }

  Delete(product){
    this.loadingService.confirmLoading(true);

    this.productService.deleteProduct(product).subscribe(result => {
      this.loadProducts(product.StoreId);
      this.toastr.success("Producto eliminado correctamente");
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;

    })
    this.loadingService.confirmLoading(false);
  }

  closeDialog(type:string) {
    this.showEdit = false;
    this.showNewProp = false;
    this.showViewProp = false;

    if (type === 'reload'){
      this.loadStores();
    }
  }

  loadStores() {
    //como si eligiera una store de las que administra
    this.tiendas = this.loginService.getTiendas();
    //
  }


  getStoreIdselected() {
    return this.currentUserId;
  }

  newProduct() {
    this.router.navigate(['./new'], {relativeTo: this.activatedRoute});
  }

  edit(product) {
    this.showEdit = true;
    this.productEdit = product;
    //this.router.navigate(['./edit/' + productId], {relativeTo: this.activatedRoute});
  }
}
