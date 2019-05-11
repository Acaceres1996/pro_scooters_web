import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Adminsession } from 'src/app/model/admin/adminsession/adminsession';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user = Adminsession;

  constructor(private loginService : LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getCurrentUser();
  }

  logout(){
    this.loginService.logout();
  }

}
