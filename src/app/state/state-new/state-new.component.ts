import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { State } from '../../models/state';
import { StoreService } from '../../services/store.service';
import { TOASTR_TOKEN } from '../../services/toastr.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import { LoginService } from '../../login/login.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-state-new',
  templateUrl: './state-new.component.html',
  styleUrls: ['./state-new.component.scss']
})
export class StateNewComponent implements OnInit {
  
  stateFG: FormGroup;
  StoreId: number =  1;
  state: State;
  states: State[];
  selectedPrevious: number = 0;

  @ViewChild('fileInput') fileInputVariable: ElementRef;
  saveDisabled:boolean = true;

  constructor(@Inject(TOASTR_TOKEN) private toastr,
      private loadingService:LoadingService,
      private loginService:LoginService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private storeService:StoreService,
      private stateService:StateService) { }

  ngOnInit() {

    //cambiar cuando pueda seleccionarse de la store.
    this.StoreId = this.loginService.getTienda().Id;
    //

    this.loadStates();

    this.stateFG = new FormGroup(
      {
        stateIdSelected: new FormControl(''),
        Name: new FormControl(''),
        SendNotification: new FormControl('')
      })

      this.stateFG.statusChanges.subscribe(result => {
        this.saveDisabled = !(this.stateFG.dirty && this.stateFG.valid);
      })

  }

  closeNew() {
    this.router.navigate(['../../state'], {relativeTo: this.activatedRoute});
  }

  loadStates() {
    //como si eligiera una store de las que administra,
    this.stateService.getStatesByStore(this.StoreId).subscribe(result => {
     this.states = result;
    //
    })

  }

  saveClicked() {
    let state = new State();
    state.Name = this.stateFG.get('Name').value;
    state.Previous = this.stateFG.get('stateIdSelected').value || 0;
    state.StoreId = this.StoreId; 
    state.Final = false;
    state.Initial = false;
    state.SendNotification = this.stateFG.get('SendNotification').value || false;
    state.Removed = false;
    
    this.stateService.addState(state).subscribe(result => {

      this.toastr.success("Estado Creado ");
      this.router.navigate(['../../state'], {relativeTo: this.activatedRoute});
    })
    
  }
}
