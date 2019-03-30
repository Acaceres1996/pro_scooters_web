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
import { State } from '../models/state';
import { debug } from 'util';

@Injectable()
export class StateService {

    constructor(private httpClient: HttpClient,
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

        getStatesByStore(storeId): Observable<any> {
            const url =  this.appConfigurationService.getStatesByStore() + '&storeId=' + storeId;

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        addState(state: State) {
            const url =  this.appConfigurationService.getStatesUrl();
            const body = JSON.stringify(state);
            
            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        updateState(state: State) {
            const url =  this.appConfigurationService.getStatesUrl();
            const body = JSON.stringify(state);
            
            return this.httpClient.put<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        deleteState(state: State) {
            const url =  this.appConfigurationService.getStatesUrl()+ '&Id=' + state.Id;
            
            return this.httpClient.delete<any>(url,  {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        updateBuyState(stateChange: StateChange) {
            const url = 'https://yatelollevo-logicandproxy.azurewebsites.net/api/Buy?code=22jTQE7xn2Xyat1AWxxPd1byDit2wU1/Kvf03ZZzEgtdbhAPPnGW6w==';
            const body = JSON.stringify(stateChange);

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

    export class StateChange {
        Id: number;
        stateId: number;
    }
