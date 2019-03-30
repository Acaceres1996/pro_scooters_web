import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'angularx-social-login';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { AppConfigurationService } from './configuration.service';
import { Store } from '../models/store';
import { LoginService } from '../login/login.service';

@Injectable()
export class StoreService {
    currentUser: any;
    socialUser:any;
    redirectUrl: string;

    constructor(private httpClient: HttpClient, 
        private loginService: LoginService,
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

        getStoresByUser(userId): Observable<any> {
            const url:string =  this.appConfigurationService.getStoresByUser() + "&IdUser=" + userId;

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .map(result => {
                    return result.map(item => {
                        const store = new Store();
                        store.Id = item.Id;
                        store.AverageScore = item.AverageScore || 0;
                        store.AverageShippingDelay = item.AverageShippingDelay || 0;
                        store.ItemId = item.ItemId || 0;
                        store.Logo = item.Logo || '';
                        store.LookAndFeelId = item.LookAndFeelId || 0;
                        store.PointsByPesoExchange = item.PointsByPesoExchange || 0;
                        store.Description = item.Description || '';
                        store.Longitude = item.Longitude || 0;
                        store.Latitude = item.Latitude || 0;
                        store.ShippingArea = item.ShippingArea || 0;
                        store.Name = item.Name || '';
                        store.Mail = item.Mail || '';
                        store.Delivery = item.Delivery || '';
                        store.Telephone = item.Telephone || '';
                        store.URL = item.URL || '';
                        store.Removed = item.Removed || false;
                        return store;
                    });
                })
                .catch(this.handleError);    
        }

        getStores(): Observable<any> {
            const url:string =  this.appConfigurationService.getStoreServiceUrl();

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .map(result => {
                    return result.map(item => {
                        const store = new Store();
                        store.Id = item.Id;
                        store.AverageScore = item.AverageScore || 0;
                        store.Description = item.Description || '';
                        store.Latitude = item.Latitude || 0;
                        store.Longitude = item.Longitude || 0;
                        store.Name = item.Name || '';
                        store.Mail = item.Mail || '';
                        store.Telephone = item.Telephone || '';
                        return store;
                    });
                })
                .catch(this.handleError);    
        }

        getStoreByUrl(urlString): Observable<any> {
            const url:string =  this.appConfigurationService.getStoreByUrlServiceUrl() + "&url=" + urlString;

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .map(result => {
                    const store = new Store();
                    store.Id = result.Id;
                    store.AverageScore = result.AverageScore || 0;
                    store.Description = result.Description || '';
                    store.Latitude = result.Latitude || 0;
                    store.Longitude = result.Longitude || 0;
                    store.Name = result.Name || '';
                    store.Mail = result.Mail || '';
                    store.Telephone = result.Telephone || '';
                    return store;
                })
                .catch(this.handleError);
        }


        getStore(storeId): Observable<any> {
            const url =  this.appConfigurationService.getStoreServiceUrl() + '&id=' + storeId;

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .map(result => {
                    const store = new Store();
                    store.Id = result.Id;
                    store.AverageScore = result.AverageScore || 0;
                    store.Description = result.Description || '';
                    store.Latitude = result.Latitude || 0;
                    store.Longitude = result.Longitude || 0;
                    store.Name = result.Name || '';
                    store.Mail = result.Mail || '';
                    store.Telephone = result.Telephone || '';
                    store.AverageShippingDelay = result.AverageShippingDelay || 0;
                    store.ItemId = result.ItemId || 0;
                    store.Logo = result.Logo || '';
                    store.LookAndFeelId = result.LookAndFeelId || 0;
                    store.PointsByPesoExchange = result.PointsByPesoExchange || 0;
                    store.Removed = result.Removed || false;
                    store.ShippingArea = result.ShippingArea || 0;
                    store.URL = result.URL || '';
                    store.Delivery = result.Delivery || '';
                    return store;
                })
                .catch(this.handleError);
        }

        validateStoreName(storeName: string) {
            const url =  this.appConfigurationService.getStoreByNameServiceUrl() + '&name=' + storeName;
            const token = this.loginService.getCurrentUser().Token;
            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token),
            })
            .do(response => console.log(JSON.stringify(response)))
            .catch(this.handleError);
        }

        addStore(tienda: any) {
            const currentUser = this.loginService.getCurrentUser();
            tienda.userId = currentUser.Id;

            const url =  this.appConfigurationService.getStoreServiceUrl();
            const body = JSON.stringify(tienda);
            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + currentUser.Token),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        updateStore(tienda: Store) {
            const url =  this.appConfigurationService.getStoreServiceUrl();
            const body = JSON.stringify(tienda);
            
            return this.httpClient.put<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        deleteStore(tienda: Store) {
            const url =  this.appConfigurationService.getStoreServiceUrl() + "&Id=" + tienda.Id;
            
            return this.httpClient.delete<any>(url,  {
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