import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { AuthService } from '../../store/authentication';
import { GetUserDetailsService } from './../../store/authentication/services/get-user-details.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userDetailsService: GetUserDetailsService,
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return this.userDetailsService.getUserDetails().pipe(
      map(user => {
        if (Object.keys(user).length === 0 && user.constructor === Object) {
          // why did I log out?
          // this.authService.logout();
          return false;
        } else {
          return true;
        }
      }),
      catchError(err => {
        return Observable.of(true);
      })
    );
  }
}
