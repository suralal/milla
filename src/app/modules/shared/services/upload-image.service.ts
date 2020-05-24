import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { LocalStorageService } from './localstorage.services';

@Injectable()
export class UploadImageService {
  constructor(
    private http: HttpClient,
    public localStorageService: LocalStorageService
  ) {}

  uploadImage(url, payload): Observable<any> {
    const token = this.localStorageService.getUserToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    headers.delete('Content-Type');
    return this.http.put(url, payload, { headers: headers }).pipe(
      map(res => {
        return res;
      }),
      catchError(res => {
        return new ErrorObservable(
          'Something bad happened; please try again later.'
        );
      })
    );
  }
}
