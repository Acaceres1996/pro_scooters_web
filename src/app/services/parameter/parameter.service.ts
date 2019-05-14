import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Parameter } from 'src/app/model/parameter/parameter';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(
    private httpClient : HttpClient,
    private endpoints : EndpointmanagerService
  ) { }

  list(): Observable<Parameter>{
    return this.httpClient.get<Parameter>( this.endpoints.getParameterEndpoint() )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  get(id : string): Observable<Parameter>{
    return this.httpClient.get<Parameter>( this.endpoints.getParameterEndpoint() + "/" + id )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  update(parameter : Parameter) : Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put<any>(this.endpoints.getParameterEndpoint() + "/" + parameter.id, JSON.stringify(parameter), httpOptions)
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
