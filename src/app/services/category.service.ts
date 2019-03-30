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
import { Category } from '../models/category';
import { Itemcategory } from '../models/itemcategory';
@Injectable()
export class CategoryService {
    
    constructor(private httpClient: HttpClient, 
        private appConfigurationService: AppConfigurationService,
        private authService: AuthService) { }

    
        getCategoryByItem(itemId: number){
            const url:string =  this.appConfigurationService.getCategoryByItemServiceUrl() + "&iditem=" + itemId;
            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError);    
        }

        getCategories() {
            //const url:string =  this.appConfigurationService.getCategoryByItemServiceUrl() + "&iditem=" + itemId;
            const url =  this.appConfigurationService.getCategoryServiceUrl();
            return this.httpClient.get<any>(url, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .map(result => {
                    return result.map(i => {
                        const category = new Category();
                        category.Id = i.Id;
                        category.Name = i.Name || '';
                        category.Removed = i.Removed || false;
                        return category;
                    });
                })
                .catch(this.handleError);
        }

        addCategory(category: Category) {
            //const url:string =  this.appConfigurationService.getCategoryByItemServiceUrl() + "&iditem=" + itemId;
            const url =  this.appConfigurationService.getCategoryServiceUrl();
            const body = JSON.stringify(category);
            
            return this.httpClient.post<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError); 
        }

        EditCategory(category: Category) {
            //const url:string =  this.appConfigurationService.getCategoryByItemServiceUrl() + "&iditem=" + itemId;
            const url =  this.appConfigurationService.getCategoryServiceUrl();
            const body = JSON.stringify(category);
            
            return this.httpClient.put<any>(url, body, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError); 
        }

        DeleteCategory(category: Category) {
            //const url:string =  this.appConfigurationService.getCategoryByItemServiceUrl() + "&iditem=" + itemId;
            const url =  this.appConfigurationService.getCategoryServiceUrl() + '&Id=' + category.Id;
            
            return this.httpClient.delete<any>(url,  {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                })
                .do(response => console.log(JSON.stringify(response)))
                .catch(this.handleError); 
        }

        addItemCategory(itemcategory:Itemcategory) {
            //const url:string =  this.appConfigurationService.getCategoryByItemServiceUrl() + "&iditem=" + itemId;
            const url =  this.appConfigurationService.getItemCategoryServiceUrl();
            const body = JSON.stringify(itemcategory);
            
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
