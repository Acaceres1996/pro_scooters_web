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
import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {
    
    constructor(private httpClient: HttpClient, 
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

    
        addPhoto(photo: Photo){
            const url:string =  this.appConfigurationService.getPhotoServiceUrl();
            let body = JSON.stringify(photo);
            // console.log(body);
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