import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(private http: HttpClient) { }

  startPayment(): Observable<String>{
    return this.http.get<String>('https://api.urudin.tk/paypal/start')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  finishPayment(paymentId, buyerId){
    //incompleto
    this.http.post('https://api.urudin.tk/paypal/finish','',this.httpOptions);
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
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
