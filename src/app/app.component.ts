import { Component, OnInit, Inject } from '@angular/core';
import { SignalRService } from './services/SignalRService.service';
import { StateService } from './services/state.service';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN } from './services/toastr.service';
import { BuyService } from './services/buy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private signalRService: SignalRService,
      private stateService: StateService,
      private loginService: LoginService,
      private router: Router,
      private buyService: BuyService,
      @Inject(TOASTR_TOKEN) private toastr) {}

  ngOnInit() {
    this.signalRService.init();
    this.signalRService.messages.subscribe(message => {
      let messageType;
      try {
        const messageObj = JSON.parse(message);
        messageType = messageObj.category;
        message = messageObj.text;
      } catch (e) {
        messageType = 'text';
      }
      this.toastr.info(message);
      if (messageType === 'buyModification' && this.router.isActive('/main/buy', false)) {
        this.buyService.runUpdateBuyList(null);
      }
    });

    this.stateService.getStatesByStore(this.loginService.getTienda().Id).subscribe(result => {
      this.loginService.setStates(result);
    });

  }
}
