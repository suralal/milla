import { Action } from '@ngrx/store';

export enum GetUserDetailsActionTypes {
  GET_USER_DETAILS = '[AUTH] GET_USER_DETAILS',
  GET_USER_DETAILS_SUCCESS = '[AUTH] GET_USER_DETAILS_SUCCESS',
  GET_USER_DETAILS_ERROR = '[AUTH] GET_USER_DETAILS_ERROR'
}
export class GetUserDetails implements Action {
  readonly type = GetUserDetailsActionTypes.GET_USER_DETAILS;
  constructor(public payload?: any) {}
}
export class GetUserDetailsSuccess implements Action {
  readonly type = GetUserDetailsActionTypes.GET_USER_DETAILS_SUCCESS;
  constructor(public payload?: any) {}
}
export class GetUserDetailsFail implements Action {
  readonly type = GetUserDetailsActionTypes.GET_USER_DETAILS_ERROR;
  constructor(public payload?: any) {}
}
export type GetUserDetailsAction =
  | GetUserDetails
  | GetUserDetailsSuccess
  | GetUserDetailsFail;
