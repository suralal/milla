import { GetNetworkDetailsService } from './../services/get-selected-network.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

import * as fromActions from '../actions';

@Injectable()
export class GetNetworkDetailsEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private getNetworkDetailsService: GetNetworkDetailsService
  ) {}
  @Effect()
  GetNetworkDetails$ = this.actions$
    .ofType(fromActions.GetSelectedNetworkActionTypes.GET_SELECTED_NETWORK)
    .pipe(
      switchMap((action: fromActions.GetSelectedNetwork) => {
        return this.getNetworkDetailsService
          .getNetworkDetails(action.payload.id)
          .pipe(
            map(res => {
              return new fromActions.GetSelectedNetworkSuccess(res);
            }),
            tap(res => {
              // console.log(res);
            }),
            catchError(error =>
              of(new fromActions.GetSelectedNetworkFail(error))
            )
          );
      })
    );
}
