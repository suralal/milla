import { Router } from '@angular/router';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as fromActions from '../actions';
import * as fromCoreActions from './../../core/actions';
import { UpdateUserDetailsService } from './../services/update-user-details.service';
import { LocalStorageService } from './../../../modules/shared/services/localstorage.services';

@Injectable()
export class UpdateUserDetailsEffect {
  constructor(
    private actions$: Actions,
    private userDetailsService: UpdateUserDetailsService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  @Effect()
  updateUserDetails$ = this.actions$
    .ofType(fromActions.UpdateUserDetailsActionTypes.UPDATE_USER_DETAILS)
    .pipe(
      switchMap((action: fromActions.UpdateUserDetails) => {
        return this.userDetailsService.updateUserDetails(action.payload).pipe(
          switchMap(res => {
            return [
              new fromActions.UpdateUserDetailsSuccess(res),
              new fromCoreActions.OpenModal({ notificationModal: true })
            ];
          }),
          tap(v => {
            this.router.navigate(['/dashboard']);
            this.localStorageService.setUserRegisteredStatus('true');
          }),
          catchError(error => of(new fromActions.UpdateUserDetailsFail(error)))
        );
      })
    );
}
