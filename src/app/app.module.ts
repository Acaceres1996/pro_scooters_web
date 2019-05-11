import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
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
import { EndpointmanagerService } from './services/endpoints/endpointmanager.service';
import { LoginService } from './services/login/login.service';
import { Authguard } from './services/authguard/authguard';

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
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [Authguard],
        children: [
          { path: '', component: IndexComponent, outlet: 'admin_outlet' },
          { path: 'scans', component: ScanComponent, outlet: 'admin_outlet' },
          { path: 'paypal', component: PaypalComponent, outlet: 'admin_outlet' }
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
    EndpointmanagerService,
    LoginService,
    AuthService,
    PaypalService,
    ScanService,
    AuthService,
    Authguard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
