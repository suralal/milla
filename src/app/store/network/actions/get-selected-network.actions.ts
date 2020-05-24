import { Action } from '@ngrx/store';

export enum GetSelectedNetworkActionTypes {
  GET_SELECTED_NETWORK = '[NETWORK] GET_SELECTED_NETWORK',
  GET_SELECTED_NETWORK_SUCCESS = '[MODAL] GET_SELECTED_NETWORK_SUCCESS',
  GET_SELECTED_NETWORK_ERROR = '[MODAL] GET_SELECTED_NETWORK_ERROR'
}
export class GetSelectedNetwork implements Action {
  readonly type = GetSelectedNetworkActionTypes.GET_SELECTED_NETWORK;
  constructor(public payload?: { id: string }) {}
}
export class GetSelectedNetworkSuccess implements Action {
  readonly type = GetSelectedNetworkActionTypes.GET_SELECTED_NETWORK_SUCCESS;
  constructor(public payload?) {}
}
export class GetSelectedNetworkFail implements Action {
  readonly type = GetSelectedNetworkActionTypes.GET_SELECTED_NETWORK_ERROR;
  constructor(public payload?) {}
}

export type GetSelectedNetworkActions =
  | GetSelectedNetwork
  | GetSelectedNetworkSuccess
  | GetSelectedNetworkFail;
