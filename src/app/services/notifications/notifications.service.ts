import { Injectable } from '@angular/core';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Notif } from 'src/app/model/notif/notif';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private endpoints: EndpointmanagerService,
    private httpClient: HttpClient
  ) { }

  list(): Observable<Notif> {
    return this.httpClient.get<Notif>(this.endpoints.getNotificationsEndpoint())
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  create(n : Notif): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<any>(this.endpoints.getNotificationsEndpoint(), JSON.stringify(n), httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
