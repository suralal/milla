import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

import * as fromActions from '../actions';
import { GetUserDetailsService } from './../services/get-user-details.service';
import { formatUserProfileToMillaUser } from '../../../utils/helpers';
import { LocalStorageService } from './../../../modules/shared/services/localstorage.services';

@Injectable()
export class GetUserDetailsEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private userDetailsService: GetUserDetailsService,
    private localStorageService: LocalStorageService
  ) {}
  @Effect()
  getUserDetails$ = this.actions$
    .ofType(fromActions.GetUserDetailsActionTypes.GET_USER_DETAILS)
    .pipe(
      switchMap((action: fromActions.GetUserDetails) => {
        return this.userDetailsService.getUserDetails().pipe(
          map(res => {
            const profile = formatUserProfileToMillaUser(res);
            this.localStorageService.setUserDetails(profile);
            // this.router.navigate(['/dashboard']);
            return new fromActions.GetUserDetailsSuccess(profile);
          }),
          tap(res => {
            // console.log(res);
          }),
          catchError(error => of(new fromActions.GetUserDetailsFail(error)))
        );
      })
    );
}
