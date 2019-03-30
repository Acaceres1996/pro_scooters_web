import { Component, OnInit, Inject } from '@angular/core';
import { LookAndFeelService } from '../../../services/lookAndFeel.service';
import { LoginService } from '../../../login/login.service';
import { StoreService } from '../../../services/store.service';
import { TOASTR_TOKEN } from '../../../services/toastr.service';
import { LoadingService } from '../../../services/loading.service';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-look-and-feel-list',
  templateUrl: './look-and-feel-list.component.html',
  styleUrls: ['./look-and-feel-list.component.scss']
})
export class LookAndFeelListComponent implements OnInit {

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
  ngOnInit() {
    this.reloadItemList();
  }

  reloadItemList() {
    this.loadingService.confirmLoading(true);    
    this.lookAndFeelService.getItems().subscribe(items => {
      this.itemList = items;
      this.loadingService.confirmLoading(false);
      this.loading = false;
    }, err => {
      this.loadingService.confirmLoading(false);
      console.log(err);
      this.toastr.error(err.message);
    })
 
  }

  edit(item) {
    this.editedItem = item;
    this.showEdit = true;
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
