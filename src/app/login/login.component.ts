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
  }

  login() {
    this.loginService.login(this.mail, this.password).subscribe(result => {
      this.loginService.getUserByToken(result.Token).subscribe(user => {
        let _user = new Adminsession(user);
        _user.Token = result.Token;
        this.loginService.setCurrentUser(_user);
        this.router.navigate(['admin']);
      });
    }, error => {
      console.log(error.message);
    });
  }

}
