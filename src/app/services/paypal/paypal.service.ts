import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pair } from '../../model/pair/pair';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  startPayment(): Observable<Pair>{
    return this.http.get<Pair>('https://api.urudin.tk/paypal/start')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  finishPayment(paymentId, buyerId) : Observable<Pair>{
    let body = [];
    let p = new Pair();
    p.key = "paymentid";
    p.value = paymentId;
    body.push( p );
    p = new Pair();
    p.key = "buyerid";
    p.value = buyerId;
    body.push( p );
    console.log(JSON.stringify(body));
    return this.http.post<Pair>('https://api.urudin.tk/paypal/finish',JSON.stringify(body),this.httpOptions)
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
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
