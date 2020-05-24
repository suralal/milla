import { NetworksState } from '../reducers';
import { createFeatureSelector } from '@ngrx/store';

export const selectNetworkState = createFeatureSelector<NetworksState>(
  'network'
);
