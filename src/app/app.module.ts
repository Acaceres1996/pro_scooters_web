import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppConfigurationService } from './services/configuration.service';
import { LoginService } from './login/login.service';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TOASTR_TOKEN, ToastrService } from './services/toastr.service';
import { RegisterComponent } from './register/register.component';
import { StoreService } from './services/store.service';
import { LoadingService } from './services/loading.service';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { ItemService } from './services/item.service';
import { TiendaNewComponent } from './tienda-new/tienda-new.component';
import { LookAndFeelService } from './services/lookAndFeel.service';
import { ProductService } from './services/producto.service';
import { PhotoService } from './services/photo.service';
import { CategoryService } from './services/category.service';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { PickPositionComponent } from './pick-position/pick-position.component';
import { LookAndFeelListComponent } from './administration/look-and-feel/look-and-feel-list/look-and-feel-list.component';
import { LookAndFeelNewComponent } from './administration/look-and-feel/look-and-feel-new/look-and-feel-new.component';
import { LookAndFeelUpdateComponent } from './administration/look-and-feel/look-and-feel-update/look-and-feel-update.component';
import { ItemListComponent } from './administration/look-and-feel/item-list/item-list.component';
import { CategoryListComponent } from './administration/look-and-feel/category-list/category-list.component';
import { StateService } from './services/state.service';
import { StateListComponent } from './state/state-list/state-list.component';
import { SignalRService } from './services/SignalRService.service';
import { StateNewComponent } from './state/state-new/state-new.component';
import { BuyService } from './services/buy.service';
import { BuyListComponent } from './buy/buy-list/buy-list.component';
import { DashboardRadialComponent } from './charts/dashboard-radial/dashboard-radial.component';
import { DashboardListComponent } from './charts/dashboard-list/dashboard-list.component';
import { RadialGraphComponent } from './charts/radial-graph/radial-graph.component';
import { BuyDetailsComponent } from './buy/buy-details/buy-details.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { BuyHistoryComponent } from './buy/buy-history/buy-history.component';
import { IncomeComponent } from './income/income.component';
import { IncomeStoreComponent } from './income-store/income-store.component';

const config = new AuthServiceConfig([]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    RegisterComponent,
    HamburgerComponent,
    TiendaNewComponent,
    ProductListComponent,
    ProductNewComponent,
    PickPositionComponent,
    LookAndFeelListComponent,
    LookAndFeelNewComponent,
    LookAndFeelUpdateComponent,
    ItemListComponent,
    CategoryListComponent,
    StateListComponent,
    StateNewComponent,
    BuyListComponent,
    DashboardRadialComponent,
    DashboardListComponent,
    RadialGraphComponent,
    BuyDetailsComponent,
    AlertComponent,
    BuyHistoryComponent,
    IncomeComponent,
    IncomeStoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'main', component: MainComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'tienda/new', component: TiendaNewComponent },
        { path: 'product', component: ProductListComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'product/new', component: ProductNewComponent },
        { path: 'state', component: StateListComponent },
        { path: 'state/new', component: StateNewComponent },
        { path: 'buy', component: BuyListComponent },
        { path: 'income', component: IncomeStoreComponent }
      ]},
      { path: 'administration', component: MainComponent,
    children: [
      { path: 'lookandfeel', component: LookAndFeelListComponent},
      { path: 'item', component: ItemListComponent},
      { path: 'category', component: CategoryListComponent},
      { path: 'income', component: IncomeComponent }
    ]}
    ], { useHash: true })
  ],
  providers: [
    AppConfigurationService,
    SignalRService,
    LoginService,
    StoreService,
    AuthService,
    LoadingService,
    LookAndFeelService,
    ProductService,
    CategoryService,
    PhotoService,
    ItemService,
    StateService,
    AlertService,
    BuyService,
    { provide: TOASTR_TOKEN, useClass: ToastrService },
    {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
