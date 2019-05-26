import { Injectable } from '@angular/core';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private endpoints : EndpointmanagerService,
    private httpClient : HttpClient
  ) { }

  list(): Observable<any>{
    return this.httpClient.get<any>( this.endpoints.getPaymentsEndpoint() + "/pagos" )
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
