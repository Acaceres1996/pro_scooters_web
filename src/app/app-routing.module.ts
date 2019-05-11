import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { Authguard } from './services/authguard/authguard';
import { IndexComponent } from './admin/index/index.component';
import { ScanComponent } from './admin/scan/scan.component';
import { PaypalComponent } from './admin/paypal/paypal.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
