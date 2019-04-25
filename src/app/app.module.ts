import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScanComponent } from './scan/scan.component';
import { IndexComponent } from './index/index.component';
import { ReturnComponent } from './paypal/return/return.component';
import { CancelComponent } from './paypal/cancel/cancel.component';
import { PaypalComponent } from './paypal/paypal.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    IndexComponent,
    ReturnComponent,
    CancelComponent,
    PaypalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'scans', component:ScanComponent},
      {path:'index', component:IndexComponent},
      {path:'paypal',component: PaypalComponent,
      children:[
        {path:'return',component:ReturnComponent},
        {path:'cancel',component:CancelComponent}
      ]},
      {},
      {path:'', redirectTo: '/index', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
