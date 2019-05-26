import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scooter } from 'src/app/model/scooter/scooter';
import { Observable, throwError } from 'rxjs';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScooterService {

  constructor(
    private httpClient : HttpClient,
    private endpoints : EndpointmanagerService
    ) { }

  list(): Observable<Scooter>{
    return this.httpClient.get<Scooter>( this.endpoints.getScooterEndpoint() )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  get(id : string): Observable<Scooter>{
    return this.httpClient.get<Scooter>( this.endpoints.getScooterEndpoint() + "/" + id )
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  create(serial : String): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let s = new Scooter();
    s.numeroserial = serial;
    return this.httpClient.post<any>(this.endpoints.getScooterEndpoint(), JSON.stringify(s), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  update(scooter : Scooter) : Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put<any>(this.endpoints.getScooterEndpoint(), JSON.stringify(scooter), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  delete(id : number): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.delete<any>( (this.endpoints.getScooterEndpoint() + "/" + id) , httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error);
 }
}
