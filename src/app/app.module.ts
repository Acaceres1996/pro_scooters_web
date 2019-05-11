import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceConfig, AuthService } from 'angularx-social-login';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReturnComponent } from './admin/paypal/return/return.component';
import { CancelComponent } from './admin/paypal/cancel/cancel.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PaypalService } from './services/paypal/paypal.service';
import { ScanService } from './services/scan/scan.service';
import { AdminComponent } from './admin/admin.component';
import { EndpointmanagerService } from './services/endpoints/endpointmanager.service';
import { LoginService } from './services/login/login.service';
import { Authguard } from './services/authguard/authguard';
import { IndexComponent } from './admin/index/index.component';
import { ScanComponent } from './admin/scan/scan.component';
import { PaypalComponent } from './admin/paypal/paypal.component';
import { ScootersComponent } from './admin/scooters/scooters.component';
import { NewscooterComponent } from './admin/scooters/newscooter/newscooter.component';
import { ListscootersComponent } from './admin/scooters/listscooters/listscooters.component';

const config = new AuthServiceConfig([]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ReturnComponent,
    CancelComponent,
    NavbarComponent,
    LoginComponent,
    AdminComponent,
    IndexComponent,
    PaypalComponent,
    ScanComponent,
    ScootersComponent,
    NewscooterComponent,
    ListscootersComponent
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
        redirectTo: 'admin',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'paypal/cancel',
        component: CancelComponent
      },
      {
        path: 'paypal/return',
        component: ReturnComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [Authguard],
        children: [
          {
            path: '',
            component: IndexComponent,
            pathMatch: 'full'
          },
          {
            path: 'scooters',
            component: ScootersComponent,
            canActivate: [Authguard],
            children: [
              {
                path: '',
                component: ListscootersComponent,
                canActivate: [Authguard]
              },
              {
                path: 'new',
                component: NewscooterComponent,
                canActivate: [Authguard]
              },
            ]
          },          
          {
            path: 'scans',
            component: ScanComponent,
            canActivate: [Authguard]
          },
          {
            path: 'paypal',
            component: PaypalComponent,
            canActivate: [Authguard]
          }
        ]
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
