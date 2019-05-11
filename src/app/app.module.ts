import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthServiceConfig, AuthService } from 'angularx-social-login';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ScanComponent } from './admin/scan/scan.component';
import { IndexComponent } from './admin/index/index.component';
import { ReturnComponent } from './admin/paypal/return/return.component';
import { CancelComponent } from './admin/paypal/cancel/cancel.component';
import { PaypalComponent } from './admin/paypal/paypal.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PaypalService } from './services/paypal/paypal.service';
import { ScanService } from './services/scan/scan.service';
import { AdminComponent } from './admin/admin.component';

const config = new AuthServiceConfig([]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    IndexComponent,
    ReturnComponent,
    CancelComponent,
    PaypalComponent,
    NavbarComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        children: [          
          { path: '', component: IndexComponent, outlet:'admin_outlet'},
          {path: 'scans',component: ScanComponent, outlet: 'admin_outlet'},
          {path: 'paypal',component: PaypalComponent, outlet: 'admin_outlet'}
        ]
      },
      

      
      {
        path: 'paypal/cancel',
        component: CancelComponent
      },
      {
        path: 'paypal/return',
        component: ReturnComponent
      }
    ])
  ],
  providers: [
    AuthService,
    PaypalService,
    ScanService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
