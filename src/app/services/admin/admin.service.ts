import { Injectable } from '@angular/core';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { Observable, throwError } from 'rxjs';
import { Admin } from '../../model/admin/admin';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private endpoints : EndpointmanagerService,
    private httpClient : HttpClient
  ) { }

  list(): Observable<Admin>{
    return this.httpClient.get<Admin>( this.endpoints.getAdminEndpoint() )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  create(admin : Admin): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(this.endpoints.getAdminEndpoint(), JSON.stringify(admin), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
