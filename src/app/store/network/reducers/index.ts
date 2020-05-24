import { ActionReducerMap } from '@ngrx/store';
import * as networksReducer from './networks.reducer';

export interface NetworksState {
  networksReducer: networksReducer.State;
}

export const NetworksReducer: ActionReducerMap<NetworksState> = {
  networksReducer: networksReducer.NetworkReducer
};
