import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { ACCESS_NETWORK_WITH_PIN_URL } from './../../../utils/config';

@Injectable()
export class ValidatePINService {
  constructor(private http: HttpClient) {}

  validatePIN(payload, id): Observable<any> {
    return this.http.post(ACCESS_NETWORK_WITH_PIN_URL(id), payload).pipe(
      map(res => {
        return res;
      }),
      catchError(res => {
        return new ErrorObservable(res.error.errors[0]);
      })
    );
  }
}
