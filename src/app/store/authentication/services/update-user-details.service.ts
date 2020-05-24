import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { USER_DETAIL_URL } from './../../../utils/config';

@Injectable()
export class UpdateUserDetailsService {
  constructor(private http: HttpClient) {}

  updateUserDetails(payload): Observable<any> {
    return this.http.put(USER_DETAIL_URL, payload).pipe(
      map(res => {
        return res;
      }),
      catchError(res => {
        return new ErrorObservable(res.error.errors[0]);
      })
    );
  }
}
