import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin/admin';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Adminsession } from '../model/admin/adminsession/adminsession';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string;
  mail: string;
  user: SocialUser;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    console.log(this.loginService.getCurrentUser());
    console.log(this.loginService.isLoggedIn());
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }

  login() {
    this.loginService.login(this.mail, this.password).subscribe(result => {
      console.log(result);
      let _user = new Adminsession(result);
      console.log(_user);
      this.loginService.setCurrentUser(_user);
      this.router.navigate(['admin']);
    }, error => {
      console.log(error.message);
    });
  }

}
