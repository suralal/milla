import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

import { USER_DETAIL_URL } from './../../../utils/config';
import { LocalStorageService } from './../../../modules/shared/services/localstorage.services';

@Injectable()
export class GetUserDetailsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  getUserDetails(): Observable<any> {
    return this.http.get(USER_DETAIL_URL, { observe: 'response' }).pipe(
      map(res => {
        if (
          res.status === 206 &&
          this.localStorageService.getUserRegisteredStatus() !== 'true'
        ) {
          this.router.navigate(['/auth/success']);
          return {};
        } else {
          return res.body;
        }
      }),
      catchError(res => {
        return new ErrorObservable(
          'Something bad happened; please try again later.'
        );
      })
    );
  }
}
