import { GetUserDetails } from './../actions/get-user-details.actions';
import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';

import * as fromUser from '../reducers/user-details.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>('user');
export const GetUserDetails$ = createSelector(
  selectUserState,
  state => state.user
);
export const GetUserDetailsErrorStatus$ = createSelector(
  selectUserState,
  state => state.error
);
