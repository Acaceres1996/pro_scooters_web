import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angularx-social-login';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AppConfigurationService } from '../services/configuration.service';
import { UserFront } from '../models/user';
import { Store } from '../models/store';

@Injectable()
export class LoginService {
    currentUser: any;
    socialUser: any;
    redirectUrl: string;
    tienda: Store;
    tiendas: Store[];
    states: any[];

    constructor(private httpClient: HttpClient,
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

        setCurrentUser(user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
        }

        getCurrentUser(): any {
            if (this.currentUser) {
                return this.currentUser;
            }

        const storageUser = localStorage.getItem('currentUser');
        if (storageUser) {
            this.currentUser = JSON.parse(storageUser);
            return this.currentUser;
        }

        return null;
    }

    setStates(states) {
        localStorage.setItem('currentStates', JSON.stringify(states));
        this.states = states;
    }

    getStates(): any {
        if (this.states) {
            return this.states;
        }

        const storageStates = localStorage.getItem('currentStates');
        if (storageStates) {
            this.states = JSON.parse(storageStates);
            return this.states;
        }
        return null;
    }


    setTienda(store) {
            localStorage.setItem('currentStore', JSON.stringify(store));
            this.tienda = store;
        }

        getTienda(): any {
            if (this.tienda) {
                return this.tienda;
            }

            const storageTienda = localStorage.getItem('currentStore');
            if (storageTienda) {
                this.tienda = JSON.parse(storageTienda);
                return this.tienda;
            }

            return null;
        }

        setTiendas(stores) {
            localStorage.setItem('currentStores', JSON.stringify(stores));
            this.tiendas = stores;
        }

        getTiendas(): any {
            if (this.tiendas) {
                return this.tiendas;
            }

            const storageTiendas = localStorage.getItem('currentStores');
            if (storageTiendas) {
                this.tiendas = JSON.parse(storageTiendas);
                return this.tiendas;
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
            return !!this.currentUser || !!this.socialUser;
        }

        logout(): void {
            this.currentUser = null;
            if (this.socialUser) {
                this.authService.signOut();
            }
        }

        login(userName: string, password: string): Observable<any> {
            const url =  this.appConfigurationService.getLoginServiceUrl();
            const body = JSON.stringify({ email: userName, password: password});

            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        getUserByToken(token) {
            const url =  this.appConfigurationService.getUserByToken();

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        loginSSO(userName: string, token: string, provider: string): Observable<any> {
            const url =  this.appConfigurationService.getLoginServiceUrl() +
            '/user=' + userName + '&token=' + token + '&provider=' + provider;

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        registerUser(user: UserFront): Observable<any> {
            const url =  this.appConfigurationService.getUserServiceUrl();
            const body = JSON.stringify(user);

            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        private handleError(err: HttpErrorResponse) {
            console.error(err.message);
            return Observable.throw(err);
        }
    }
