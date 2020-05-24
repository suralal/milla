import { OpenModalActions } from './../actions/modal-status.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectCoreState } from './core.selector';

// export const selectCoreState = createFeatureSelector<fromCore.CoreState>(
//   'core'
// );

export const selectModalState = createSelector(
  selectCoreState,
  state => state.modalReducer
);

export const GetNotificationModalStatus$ = createSelector(
  selectModalState,
  state => state.notificationModal
);
export const GetSMSModalStatus$ = createSelector(
  selectModalState,
  state => state.smsModal
);
