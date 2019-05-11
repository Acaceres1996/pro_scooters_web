import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/admin/admin';
import { retry, catchError } from 'rxjs/operators';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';

@Injectable()
export class LoginService {
  Admin: any;
  socialUser: any;
  redirectUrl: string;
  states: any[];

  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private endpoints: EndpointmanagerService) { }

  setCurrentUser(user) {
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
    return !!this.Admin;
  }

  logout(): void {
    this.Admin = null;
    if (this.socialUser) {
      this.authService.signOut();
    }
  }

  login(userName: string, password: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(this.endpoints.getLogin(), JSON.stringify(this.Admin), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUserByToken(token) {
    return this.httpClient.get<any>(this.endpoints.getToken(), {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token),
    })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err);
  }
}