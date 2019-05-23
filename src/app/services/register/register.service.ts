import { Injectable } from '@angular/core';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Register } from 'src/app/model/register/register';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private endpoints : EndpointmanagerService,
    private httpClient : HttpClient
  ) { }

  getScooterInfo(id : string): Observable<Register>{
    return this.httpClient.get<Register>( this.endpoints.getRegisterEndpoint() + "/" + id )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getDisponibles(): Observable<Register>{
    return this.httpClient.get<Register>( this.endpoints.getRegisterEndpoint() + "/disponibles")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getApagados(): Observable<Register>{
    return this.httpClient.get<Register>( this.endpoints.getRegisterEndpoint() + "/apagadosbateriabaja")
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
