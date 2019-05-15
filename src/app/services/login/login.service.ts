import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angularx-social-login';
import { Observable, throwError } from 'rxjs';
import { Admin } from 'src/app/model/admin/admin';
import { retry, catchError } from 'rxjs/operators';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  Admin: any;
  socialUser: any;
  redirectUrl: string;
  states: any[];

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private endpoints: EndpointmanagerService,
    private router : Router) { }

  setCurrentUser(user) {
    console.log(user);
    localStorage.setItem('Admin', JSON.stringify(user));
    this.Admin = user;
  }

  getCurrentUser(): any {
    if (this.Admin) {
      return this.Admin;
    }
    const storageUser = localStorage.getItem('Admin');
    if (storageUser) {
      this.Admin = JSON.parse(storageUser);
      return this.Admin;
    }

    return null;
  }

  setSocialUser(user) {
    this.socialUser = user;
  }

  getSocialUser() {
    return this.socialUser;
  }

  isLoggedIn(): boolean {
    this.getCurrentUser();
    return !!this.Admin;
  }

  logout(): void {
    this.Admin = null;
    localStorage.removeItem('Admin');
    if (this.socialUser) {
      this.authService.signOut();
    }
    this.router.navigate(['/login']);
  }

  login(userName: string, password: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let admin = new Admin();
    admin.usuario = userName;
    admin.password = password;
    return this.httpClient.post<any>(this.endpoints.getLogin(), JSON.stringify(admin), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error);
 }
}