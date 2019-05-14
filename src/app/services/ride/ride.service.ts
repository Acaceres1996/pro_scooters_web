import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { Observable, throwError } from 'rxjs';
import { Ride } from 'src/app/model/ride/ride';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(
    private httpClient : HttpClient,
    private endpoints : EndpointmanagerService
  ) { }

  list(): Observable<Ride>{
    return this.httpClient.get<Ride>( this.endpoints.getRideEndpoint() )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  get(id : string): Observable<Ride>{
    return this.httpClient.get<Ride>( this.endpoints.getRideEndpoint() + "/" + id )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
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
