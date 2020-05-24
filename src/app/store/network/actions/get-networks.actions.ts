import { Action } from '@ngrx/store';

export enum GetNetworksActionTypes {
  GET_NETWORKS = '[NETWORK] GET_NETWORKS',
  GET_NETWORKS_SUCCESS = '[MODAL] GET_NETWORKS_SUCCESS',
  GET_NETWORKS_ERROR = '[MODAL] GET_NETWORKS_ERROR'
}
export class GetNetworks implements Action {
  readonly type = GetNetworksActionTypes.GET_NETWORKS;
  constructor(public payload?) {}
}
export class GetNetworksSuccess implements Action {
  readonly type = GetNetworksActionTypes.GET_NETWORKS_SUCCESS;
  constructor(public payload?) {}
}
export class GetNetworksFail implements Action {
  readonly type = GetNetworksActionTypes.GET_NETWORKS_ERROR;
  constructor(public payload?) {}
}

export type GetNetworksActions =
  | GetNetworks
  | GetNetworksSuccess
  | GetNetworksFail;
