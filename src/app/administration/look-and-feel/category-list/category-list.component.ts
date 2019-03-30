import { Component, OnInit, Inject } from '@angular/core';
import { LookAndFeelService } from '../../../services/lookAndFeel.service';
import { LoginService } from '../../../login/login.service';
import { StoreService } from '../../../services/store.service';
import { TOASTR_TOKEN } from '../../../services/toastr.service';
import { LoadingService } from '../../../services/loading.service';
import { ItemService } from '../../../services/item.service';
import { Category } from '../../../models/category';
import { Itemcategory } from '../../../models/itemcategory';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Item } from '../../../models/item';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  constructor(private loginService: LoginService,
    private storeService: StoreService,
    @Inject(TOASTR_TOKEN) private toastr,
    private loadingService: LoadingService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService) { }

    loading = false;
    categoryList: any[] = [];
    showEdit: Boolean = false;
    showNew: Boolean = false;
    editedCategory: Category;

    Nombre = '';
    ItemId = 0;

    storeFG: FormGroup;
    tienda: Item;
    tiendas: Item[];

  ngOnInit() {
    this.loadingService.confirmLoading(true);
    this.storeFG = new FormGroup(
      {
        storeIdselected: new FormControl('')
      });
    this.reloadCategoryList();
  }

  reloadCategoryList() {

    this.categoryService.getCategories().subscribe(categories => {
      this.categoryList = categories;

      this.loadingService.confirmLoading(false);
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
      this.loadingService.confirmLoading(false);
    });
  }

  edit(cat) {
    this.editedCategory = cat;
    this.showEdit = true;
  }

  newCategory() {
    this.itemService.getItems().subscribe(items => {
      this.tiendas = items;
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
    });

    this.showNew = true;
  }


  EditCategory() {
    this.categoryService.EditCategory(this.editedCategory).subscribe(catcreada => {
      this.closeDialog('reload');
      this.toastr.success('Categoria Actualizada correctamente');
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
    });
    this.showEdit = true;
  }

  DeleteCategory(cat) {
    this.categoryService.DeleteCategory(cat).subscribe(catcreada => {
      this.closeDialog('reload');
      this.toastr.success('Categoria eliminada correctamente');
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
    });
  }

  addCategory() {

    const category = new  Category;
    category.Id = 0;
    category.Name = this.Nombre;
    category.Removed = false;

    this.categoryService.addCategory(category).subscribe(catcreada => {
      const newCategory = catcreada;
      const itemcategory = new Itemcategory;
      itemcategory.IdItem = this.ItemId;
      itemcategory.IdCategory = newCategory.Id;
      this.categoryService.addItemCategory(itemcategory).subscribe(cat => {
        this.toastr.success('Categoria Creada correctamente');
      }, err => {
        console.log(err);
        this.toastr.error(err.message);
      });

      this.closeDialog('reload');
    }, err => {
      console.log(err);
      this.toastr.error(err.message);
    });
  }

  closeDialog(type: string) {
    this.showEdit = false;
    this.showNew = false;

    if (type === 'reload') {
      this.reloadCategoryList();
    }
  }

}
