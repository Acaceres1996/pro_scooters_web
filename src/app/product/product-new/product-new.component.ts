import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { ProductService } from '../../services/producto.service';
import { PhotoService } from '../../services/photo.service';
import { CategoryService } from '../../services/category.service';
import { LookAndFeelService } from '../../services/lookAndFeel.service';
import { ViewChild } from '@angular/core';
import { Store } from '../../models/store';
import { Product } from '../../models/product';
import { Photo } from '../../models/photo';
import { StoreService } from '../../services/store.service';
import { TOASTR_TOKEN } from '../../services/toastr.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  
  productFG: FormGroup;
  StoreId: number =  1;
  ItemId :  number =  1;
  Categories: any;

  @ViewChild('fileInput') fileInputVariable: ElementRef;
  saveDisabled:boolean = true;

  constructor(@Inject(TOASTR_TOKEN) private toastr,
      private loadingService:LoadingService,
      private loginService:LoginService,
      private itemService:ItemService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private lookAndFeelService:LookAndFeelService,
      private storeService:StoreService,
      private productService:ProductService,
      private photoService:PhotoService,
      private categoryService:CategoryService) { }

  ngOnInit() {

    //cambiar cuando pueda seleccionarse de la store.
    this.StoreId = this.loginService.getTienda().Id;
    this.ItemId = this.loginService.getTienda().ItemId;
    
    this.productFG = new FormGroup(
      {
        Name: new FormControl(''),
        Description: new FormControl(''),
        StorePrice: new FormControl(''),
        Long: new FormControl(''),
        Wide: new FormControl(''),
        High: new FormControl(''),
        Weight: new FormControl(''),
        CategoryId: new FormControl(''),
        Image: new FormControl(''),
        DeliveryTime: new FormControl('')
      })

      this.productFG.statusChanges.subscribe(result => {
        this.saveDisabled = !(this.productFG.dirty && this.productFG.valid);
      })

      //falta category list 
      this.categoryService.getCategoryByItem(this.ItemId).subscribe(result => {
        this.Categories = result;
        console.log(result);
      })

  }

  
  handleInputChange(e){
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.productFG.get('Image').setValue(reader.result);
    console.log(reader);
  }

  resetImage() {
    this.fileInputVariable.nativeElement.value = "";
    this.productFG.get('Image').setValue("");
  }

  closeNew() {

  }

  saveClicked() {
    let product = new Product();
    product.Name = this.productFG.get('Name').value;
    product.Description = this.productFG.get('Description').value;
    product.StorePrice = this.productFG.get('StorePrice').value;
    product.Long = this.productFG.get('Long').value;
    product.Wide = this.productFG.get('Wide').value;
    product.High = this.productFG.get('High').value;
    product.Weight = this.productFG.get('Weight').value;
    product.FinalPricePesos = 0;
    product.FinalPriceDollars = 0;

    //hardcoded
    product.CategoryId = this.productFG.get('CategoryId').value;
    product.StoreId = this.StoreId;

    product.DeliveryTime = this.productFG.get('DeliveryTime').value;
    product.Removed = false;

    let Image = this.productFG.get('Image').value;
    //console.log(Image);
    // console.log(product);
    //this.router.navigate(['../../dashboard'], {relativeTo: this.activatedRoute});




    this.productService.addProduct(product).subscribe(result => {
      let photo = new Photo();
      photo.ProductId = result['Id'];
      photo.NameFile = "";
      photo.Removed = false;
      photo.Url = "";
      photo.Imagen = Image;
      //

      this.photoService.addPhoto(photo).subscribe(result => {
        // console.log(result);
        // 
      })

      this.toastr.success("Producto creado");
      this.router.navigate(['../../product'], {relativeTo: this.activatedRoute});
    })
    
  }
}
