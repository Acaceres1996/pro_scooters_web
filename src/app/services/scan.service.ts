import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Scan } from '../classes/scan/scan';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  apiURL = 'https://api.urudin.tk/scan/';

  constructor(private http: HttpClient) {
  }

  getScans(): Observable<Scan> {
    return this.http.get<Scan>(this.apiURL)
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
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
