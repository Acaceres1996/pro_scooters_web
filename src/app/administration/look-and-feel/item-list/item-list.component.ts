import { Component, OnInit, Inject } from '@angular/core';
import { LookAndFeelService } from '../../../services/lookAndFeel.service';
import { LoginService } from '../../../login/login.service';
import { StoreService } from '../../../services/store.service';
import { TOASTR_TOKEN } from '../../../services/toastr.service';
import { LoadingService } from '../../../services/loading.service';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../models/item';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  constructor(private loginService:LoginService,
    private storeService:StoreService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService:LoadingService,
    private itemService:ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private lookAndFeelService: LookAndFeelService) { }

    loading:boolean = true;
    itemList:any[] = [];
    showEdit:Boolean = false;
    showNew:Boolean = false;
    editedItem:any = {};

    Nombre:string = '';


  ngOnInit() {
    this.reloadItemList();
  }

  reloadItemList() {
    this.loadingService.confirmLoading(true);
    this.itemService.getItems().subscribe(items => {
      this.itemList = items;
      this.loadingService.confirmLoading(false);
      this.loading = false;
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
    });
  }

  guardar() {
    let item: Item = new Item();
    item.Id = 0;
    item.Name = this.Nombre;
    item.Removed = false;

    this.itemService.addItem(item).subscribe(result => {
      this.closeDialog('reload');
      this.toastr.success("Item Creado correctamente");
    }, err => {
      this.toastr.error(err.message);
    });
  }

  edit(item) {
    this.editedItem = item;
    this.showEdit = true;
  }

  Update() {
     
      this.itemService.updateItem(this.editedItem).subscribe(result => {
        this.closeDialog('reload');
        this.toastr.success("Item Actualizado correctamente");
      }, err => {
        this.toastr.error(err.message);
      })

  }

  Delete(item) {
    this.itemService.deleteItem(item).subscribe(result => {
      this.closeDialog('reload');
      this.toastr.success("Item Eliminado correctamente");
    }, err => {
      this.toastr.error(err.message);
    })

}
  
  newItem() {
    this.showNew = true;
  }

  closeDialog(type:string) {
    this.showEdit = false;
    this.showNew = false;

    if (type === 'reload'){
      this.reloadItemList();
    }
  }

  saveEvent(e) {
    this.closeDialog(e);
  }

  cancelEvent(e) {
    this.closeDialog('');
  }

}