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
import { Item } from '../models/item';

@Injectable()
export class LookAndFeelService {
    
    constructor(private httpClient: HttpClient, 
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

        getItems(): Observable<any> {
            const url:string =  this.appConfigurationService.getLookAndFeelServiceUrl();

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                // .map(result => {
                //     return result.map(i => {
                //         const item = new Item();
                //         item.Id = i.Id;
                //         item.Name = i.Name || '';
                //         item.Removed = i.Removed || false;
                //         return item;
                //     });
                // })
                .catch(this.handleError);
        }

        addItem(lookAndFeel) {
            const url:string =  this.appConfigurationService.getLookAndFeelServiceUrl();
            const body = JSON.stringify(lookAndFeel);

            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        updateItem(lookAndFeel) {
            const url:string =  this.appConfigurationService.getLookAndFeelServiceUrl();
            const body = JSON.stringify(lookAndFeel);

            return this.httpClient.put<any>(url, body, {
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