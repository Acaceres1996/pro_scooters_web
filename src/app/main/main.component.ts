import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { debug } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  admin: Boolean = false;
  store: Boolean = false;
  currentUser: any;

  showPageLoader = false;
  constructor(private loadingService: LoadingService,
    private router: Router,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.currentUser = this.loginservice.getCurrentUser();
    if (this.currentUser['Type'] === 'UserBack') {
      this.admin = false;
      this.store = true;
    } else if (this.currentUser['Type'] === 'UserAdmin') {
      this.admin = true;
      this.store = false;
    }

    this.loadingService.loadConfirm$.subscribe(action => {
      this.showPageLoader = action;
    });
  }

  LogOut() {
    this.loginservice.setCurrentUser(null);
    this.router.navigate(['/login']);
  }

}
