import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { CREATE_NETWORK_URL } from './../../../utils/config';

@Injectable()
export class CreateNetworkService {
  constructor(private http: HttpClient) {}

  createNetwork(payload): Observable<any> {
    return this.http.post(CREATE_NETWORK_URL, payload);
  }
}
