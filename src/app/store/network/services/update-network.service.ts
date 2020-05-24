import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { NETWORK_DETAILS_URL } from './../../../utils/config';

@Injectable()
export class UpdateNetworkService {
  constructor(private http: HttpClient) {}

  updateNetwork(payload, id): Observable<any> {
    return this.http.put(NETWORK_DETAILS_URL(id), payload);
  }
}
