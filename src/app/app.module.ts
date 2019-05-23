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
import { PaypalComponent } from './admin/paypal/paypal.component';
import { ScootersComponent } from './admin/scooters/scooters.component';
import { NewscooterComponent } from './admin/scooters/newscooter/newscooter.component';
import { ListscootersComponent } from './admin/scooters/listscooters/listscooters.component';
import { AlertModule } from './alert/alert.module';
import { ViewscooterComponent } from './admin/scooters/viewscooter/viewscooter.component';
import { UpdatescooterComponent } from './admin/scooters/updatescooter/updatescooter.component';
import { ParametersComponent } from './admin/parameters/parameters.component';
import { ListparamsComponent } from './admin/parameters/listparams/listparams.component';
import { UpdateparamComponent } from './admin/parameters/updateparam/updateparam.component';
import { UsersComponent } from './admin/users/users.component';
import { ListusersComponent } from './admin/users/listusers/listusers.component';
import { RideComponent } from './admin/ride/ride.component';
import { ListridesComponent } from './admin/ride/listrides/listrides.component';
import { AdministratorsComponent } from './admin/administrators/administrators.component';
import { ListadminsComponent } from './admin/administrators/listadmins/listadmins.component';
import { NewadminComponent } from './admin/administrators/newadmin/newadmin.component';
import { PaymentsComponent } from './admin/payments/payments.component';
import { ArrendadosComponent } from './admin/scooters/maps/arrendados/arrendados.component';
import { MapsComponent } from './admin/scooters/maps/maps.component';
import { DisponiblesComponent } from './admin/scooters/maps/disponibles/disponibles.component';
import { ApagadosComponent } from './admin/scooters/maps/apagados/apagados.component';

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
    ScootersComponent,
    NewscooterComponent,
    ListscootersComponent,
    ViewscooterComponent,
    UpdatescooterComponent,
    ParametersComponent,
    ListparamsComponent,
    UpdateparamComponent,
    UsersComponent,
    ListusersComponent,
    RideComponent,
    RideComponent,
    ListridesComponent,
    AdministratorsComponent,
    ListadminsComponent,
    NewadminComponent,
    PaymentsComponent,
    ArrendadosComponent,
    MapsComponent,
    DisponiblesComponent,
    ApagadosComponent,
  ],
  imports: [
    BrowserModule,
    AlertModule,
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
              }, {
                path: 'view/:id',
                component: ViewscooterComponent,
                canActivate: [Authguard]
              },
              {
                path: 'new',
                component: NewscooterComponent,
                canActivate: [Authguard]
              },
              {
                path: 'update/:id',
                component: UpdatescooterComponent,
                canActivate: [Authguard]
              },
              {
                path: 'maps',
                component: MapsComponent,
                canActivate: [Authguard],
                children: [
                  {
                    path: 'arrendados',
                    component: ArrendadosComponent,
                    canActivate: [Authguard]
                  },
                  {
                    path: 'disponibles',
                    component: DisponiblesComponent,
                    canActivate: [Authguard]
                  },
                  {
                    path: 'apagados',
                    component: ApagadosComponent,
                    canActivate: [Authguard]
                  }
                ]
              }
            ]
          },
          {
            path: 'parameters',
            component: ParametersComponent,
            canActivate: [Authguard],
            children: [
              {
                path: '',
                component: ListparamsComponent,
                canActivate: [Authguard]
              },
              {
                path: 'update/:id',
                component: UpdateparamComponent,
                canActivate: [Authguard]
              }
            ]
          },
          {
            path: 'users',
            component: UsersComponent,
            canActivate: [Authguard],
            children: [
              {
                path: '',
                component: ListusersComponent,
                canActivate: [Authguard]
              }
            ]
          },
          {
            path: 'administrators',
            component: AdministratorsComponent,
            canActivate: [Authguard],
            children: [
              {
                path: '',
                component: ListadminsComponent,
                canActivate: [Authguard]
              }, {
                path: 'new',
                component: NewadminComponent,
                canActivate: [Authguard]
              }
            ]
          },
          {
            path: 'rides',
            component: RideComponent,
            canActivate: [Authguard],
            children: [
              {
                path: '',
                component: ListridesComponent,
                canActivate: [Authguard]
              }
            ]
          },
          {
            path: 'payments',
            component: PaymentsComponent,
            canActivate: [Authguard],
            children: [

            ]
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
