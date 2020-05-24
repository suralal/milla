import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { NETWORK_DETAILS_URL } from './../../../utils/config';

@Injectable()
export class GetNetworkDetailsService {
  constructor(private http: HttpClient) {}

  getNetworkDetails(id): Observable<any> {
    return this.http.get(NETWORK_DETAILS_URL(id)).pipe(
      map(res => {
        return res;
      }),
      catchError(res => {
        return new ErrorObservable(res.error.errors[0]);
      })
    );
  }
}
