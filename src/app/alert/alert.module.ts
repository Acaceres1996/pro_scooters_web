import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { AlertBodyComponent } from './alert-body/alert-body.component';

@NgModule({
declarations: [
AlertBodyComponent,
AlertComponent
],
imports: [
CommonModule,
BrowserAnimationsModule
],
exports: [
AlertBodyComponent,
AlertComponent
],
providers: [
AlertService
]
})

export class AlertModule { }