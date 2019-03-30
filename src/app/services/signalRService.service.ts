import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TOASTR_TOKEN } from './toastr.service';


@Injectable()
export class SignalRService {

    private readonly _http: HttpClient;
    private readonly _baseUrl: string = 'https://yatelollevo-proxy.azurewebsites.net/api/';
    private hubConnection: any;
    messages: Subject<string> = new Subject();

    constructor(http: HttpClient, @Inject(TOASTR_TOKEN) private toastr) {
        this._http = http;
    }

    private getConnectionInfo(): Observable<SignalRConnectionInfo> {
        const requestUrl = `${this._baseUrl}negotiate`;
        return this._http.get<SignalRConnectionInfo>(requestUrl);
    }

    init() {
        this.getConnectionInfo().subscribe(info => {
            info.accessToken = info.accessToken;
            info.url = info.url;

            const options = {
                accessTokenFactory: () => info.accessToken
            };

            const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(info.url, options)
            .configureLogging(signalR.LogLevel.Information)
            .build();

            hubConnection.start().catch(err => {
                 console.error(err.toString());
            });

            hubConnection.on('pushNotification', (data: any) => {
                this.messages.next(data);
            });
        });
    }

    send(message: string): Observable<void> {
        const requestUrl = `${this._baseUrl}message`;
        return this._http.post(requestUrl, message).pipe(map((result: any) => { }));
    }
}



export class SignalRConnectionInfo {
    url: string;
    accessToken: string;
    }
