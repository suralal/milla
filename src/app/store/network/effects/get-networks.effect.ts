import { GetNetworksService } from './../services/get-networks.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

import * as fromActions from '../actions';

@Injectable()
export class GetNetworksEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private getNetworksService: GetNetworksService
  ) {}
  @Effect()
  GetNetworks$ = this.actions$
    .ofType(fromActions.GetNetworksActionTypes.GET_NETWORKS)
    .pipe(
      switchMap((action: fromActions.GetNetworks) => {
        return this.getNetworksService.getNetworks().pipe(
          map(res => {
            if (!res.length) {
              this.router.navigate(['/network/network-view']);
            }
            return new fromActions.GetNetworksSuccess(res);
          }),
          tap(res => {
            // console.log(res);
          }),
          catchError(error => of(new fromActions.GetNetworksFail(error)))
        );
      })
    );
}
