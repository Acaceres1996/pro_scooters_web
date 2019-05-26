import { Injectable, ErrorHandler } from '@angular/core';
import { EndpointmanagerService } from '../endpoints/endpointmanager.service';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private endpoints: EndpointmanagerService
  ) { }

  list(): Observable<User> {
    return this.httpClient.get<User>(this.endpoints.getUserEndpoint())
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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
