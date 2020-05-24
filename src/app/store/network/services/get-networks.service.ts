import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { GET_NETWORKS_URL } from './../../../utils/config';

@Injectable()
export class GetNetworksService {
  constructor(private http: HttpClient) {}

  getNetworks(): Observable<any> {
    return this.http.get(GET_NETWORKS_URL).pipe(
      map(res => {
        return res;
      }),
      catchError(res => {
        return new ErrorObservable(res.error.errors[0]);
      })
    );
  }
}
