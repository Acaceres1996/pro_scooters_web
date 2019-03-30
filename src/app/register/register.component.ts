import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from '../login/login.service';
import { TOASTR_TOKEN } from '../services/toastr.service';
import { Router } from '@angular/router';
import { UserFront } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    @Inject(TOASTR_TOKEN) private toastr,
    private router: Router) { }

    socialUser:any;
    firstName: string;
    lastName: string;
    userEmail: string;
    password: string; 
    isSocialUser: boolean = false;


  ngOnInit() {

  }

    

  registerUser() {
    let user = new UserFront();
    user.Id = "";
    user.LastName = this.lastName;
    user.Mail = this.userEmail;
    user.Name = this.firstName;
    user.Pass = this.password;
    if ( user.Mail && user.Pass) {
      this.loginService.registerUser(user).subscribe(result => {
        this.toastr.success('Usuario Admin Tienda Creado');
      },
      err => {
        this.toastr.error(err.message);
      })
    } else {
      this.toastr.error("Invalid User Data");
    }
  }
}
