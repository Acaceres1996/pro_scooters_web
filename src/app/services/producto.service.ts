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
import { Product } from '../models/product';
import { Property } from '../models/property';
import { PropertyValue } from '../models/propertyvalue';

@Injectable()
export class ProductService {
    
    constructor(private httpClient: HttpClient, 
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

        
        getProductsByStore(storeId): Observable<any> {
            const url:string =  this.appConfigurationService.getProductsByStore() + "&storeId=" + storeId;

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);    
        }

        getAllProducts(): Observable<any> {
            const url:string =  this.appConfigurationService.getAllProducts()

            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);    
        }


        addProduct(product: Product){
            const url:string =  this.appConfigurationService.getAllProducts();
            let body = JSON.stringify(product);
            //

            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        addProperty(propery: Property){
            const url:string =  this.appConfigurationService.getPropertyUrl();
            let body = JSON.stringify(propery);
            

            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        addPropertyValue(propertyValue: PropertyValue){
            const url:string =  this.appConfigurationService.getPropertyValueUrl();
            let body = JSON.stringify(propertyValue);
            

                return this.httpClient.post<any>(url, body, {
                    headers: new HttpHeaders().set('Content-Type', 'application/json'),
                    })
                    .do(response => console.log(JSON.stringify(response)))
                    .catch(this.handleError);
        }

        getPropertyValue(product: Product){
            const url:string =  this.appConfigurationService.getPropertyUrl() + "&ProductId=" + product.Id;
            
                return this.httpClient.get<any>(url,  {
                    headers: new HttpHeaders().set('Content-Type', 'application/json'),
                    })
                    .do(response => console.log(JSON.stringify(response)))
                    .catch(this.handleError);
        }

        updateProduct(product: Product){
            const url:string =  this.appConfigurationService.getAllProducts();
            let body = JSON.stringify(product);
            //

            return this.httpClient.put<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);
        }

        deleteProduct(product: Product){
            const url:string =  this.appConfigurationService.getAllProducts() + '&Id=' + product.Id;
            //

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