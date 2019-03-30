import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, ToastrService } from '../services/toastr.service';
import { UserSession } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  password: string;
  userEmail: string;

    constructor(
      private authService: AuthService,
      private loginService: LoginService,
      @Inject(TOASTR_TOKEN) private toastr,
      private router: Router) { }

    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
      });
    }

    logRegularUser() {
      this.loginService.login(this.userEmail, this.password).subscribe(result => {
        this.loginService.getUserByToken(result.Token).subscribe(user => {
          let _user = new UserSession(user);
          _user.Token = result.Token;
          this.loginService.setCurrentUser(_user);
          if (_user['Type'] === 'UserBack') {
            this.router.navigate(['main/dashboard']);
          } else if (_user['Type'] === 'UserAdmin') {
            this.router.navigate(['main/register']);
          }

        });
      }, error => {
        this.toastr.error(error.message);
      });
    }

    register() {
      this.router.navigate(['/register']);
    }
}
