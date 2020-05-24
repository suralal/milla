import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { LocalStorageService } from './../../modules/shared/services/localstorage.services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token;
  constructor(
    public localStorageService: LocalStorageService,
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request);
    const token = this.localStorageService.getUserToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } else {
    }

    return next.handle(request).do(
      success => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            this.router.navigate(['/auth/login']);
          }
        }
      }
    );
  }
}
