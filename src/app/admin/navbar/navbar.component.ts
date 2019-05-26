import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Admin } from 'src/app/model/admin/admin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;
  user : Admin;

  constructor(private loginService : LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getCurrentUser();
  }

  logout(){
    this.loginService.logout();
  }

}
