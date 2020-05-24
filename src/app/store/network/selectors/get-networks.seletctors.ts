import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectNetworkState } from './network.selectors';

export const selectState = createSelector(
  selectNetworkState,
  state => state.networksReducer
);

export const GetUserNetworks$ = createSelector(
  selectState,
  state => state.networks
);
export const GetUserNetworksLoadingStatus$ = createSelector(
  selectState,
  state => state.loading
);
export const GetUserNetworksErrorStatus$ = createSelector(
  selectState,
  state => state.error
);

export const GetSelectedNetwork$ = createSelector(
  selectState,
  state => state.selectedNetwork
);
