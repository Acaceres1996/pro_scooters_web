import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin/admin';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { SocialUser } from 'angularx-social-login';
import { AlertType } from '../alert/alert.enum';
import { AlertService } from '../alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = "";
  mail: string = "";
  user: SocialUser;

  constructor(
    private router: Router,
    private loginService: LoginService,
    public alertService: AlertService) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }

  login() {
    if (this.password.length >= 3 && this.mail.length >= 3) {
      this.loginService.login(this.mail, this.password).subscribe(result => {
        let _user = new Admin(result);
        this.loginService.setCurrentUser(_user);
        this.alertService.clear();
        this.router.navigate(['admin']);
      }, error => {
        if (error.status == 403) {
          this.alertService.add(AlertType.error, 'Credenciales incorrectas.');
        } else {
          this.alertService.add(AlertType.error, 'Algo ha salido mal. Intentelo de vuelta.');
          console.log(error);
        }
      });
    } else {
      this.alertService.add(AlertType.error, 'Usuario o contraseña muy corto');
    }
  }

}
