import {
  GetSelectedNetworkActionTypes,
  GetSelectedNetworkActions
} from './../actions/get-selected-network.actions';
import { MillaNetwork } from './../../models/milla-network.model';
import {
  GetNetworksActions,
  GetNetworksActionTypes
} from './../actions/get-networks.actions';
import { createSelector } from '@ngrx/store';

export interface State {
  networks: MillaNetwork[];
  selectedNetwork: MillaNetwork;
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  networks: [],
  selectedNetwork: {},
  error: null,
  loading: false
};

export function NetworkReducer(
  state = initialState,
  action: GetNetworksActions | GetSelectedNetworkActions
): State {
  switch (action.type) {
    case GetNetworksActionTypes.GET_NETWORKS: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case GetNetworksActionTypes.GET_NETWORKS_SUCCESS: {
      return {
        ...state,
        networks: action.payload,
        loading: false,
        error: null
      };
    }

    case GetNetworksActionTypes.GET_NETWORKS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case GetSelectedNetworkActionTypes.GET_SELECTED_NETWORK: {
      return {
        ...state,
        selectedNetwork: {},
        loading: true,
        error: null
      };
    }
    case GetSelectedNetworkActionTypes.GET_SELECTED_NETWORK_SUCCESS: {
      return {
        ...state,
        selectedNetwork: action.payload,
        loading: false,
        error: null
      };
    }

    case GetSelectedNetworkActionTypes.GET_SELECTED_NETWORK_ERROR: {
      return {
        ...state,
        selectedNetwork: {},
        loading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
