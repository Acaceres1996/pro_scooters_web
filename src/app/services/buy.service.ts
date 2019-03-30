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
import { Buy } from '../models/buy';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BuyService {

    constructor(private httpClient: HttpClient,
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

        private updateBuyList = new Subject<any>();
        updateBuyList$ = this.updateBuyList.asObservable();

        runUpdateBuyList(loading) {
            this.updateBuyList.next(loading);
        }

        getBuysByStore(storeId, number, size, filter): Observable<any> {
            let url =  this.appConfigurationService.getBuysByStore() + '&storeId=' + storeId;
            if ( number && size) {
                url = url + `&pageNumber=${number}&pageSize=${size}`;
            }
            if (filter) {
                url = url + `&filterBy=${filter}`;
            }
            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        changeState(buyId, stateId): Observable<any> {
            const url =  'https://yatelollevo-logicandproxy.azurewebsites.net/api/Buy?' +
                'code=22jTQE7xn2Xyat1AWxxPd1byDit2wU1/Kvf03ZZzEgtdbhAPPnGW6w==';
            const body = JSON.parse(JSON.stringify({Id: buyId, StateId: stateId}));
            return this.httpClient.put<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        getBuys(): Observable<any> {
                const url =  this.appConfigurationService.getBuys();
                return this.httpClient.get<any>(url, {
                    headers: new HttpHeaders().set('Content-Type', 'application/json'),
                    })
                    .do(response => console.log(JSON.stringify(response)))
                    .catch(this.handleError);
        }

        getBuysByAdmin(userId): Observable<any> {
            const url =  this.appConfigurationService.getBuysByAdmin() + '&UserId=' + userId;
            return this.httpClient.get<any>(url, {
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
