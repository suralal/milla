import { Action } from '@ngrx/store';

export enum UpdateUserDetailsActionTypes {
  UPDATE_USER_DETAILS = '[AUTH] UPDATE_USER_DETAILS',
  UPDATE_USER_DETAILS_SUCCESS = '[AUTH] UPDATE_USER_DETAILS_SUCCESS',
  UPDATE_USER_DETAILS_ERROR = '[AUTH] UPDATE_USER_DETAILS_ERROR'
}
export class UpdateUserDetails implements Action {
  readonly type = UpdateUserDetailsActionTypes.UPDATE_USER_DETAILS;
  constructor(public payload?: any) {}
}
export class UpdateUserDetailsSuccess implements Action {
  readonly type = UpdateUserDetailsActionTypes.UPDATE_USER_DETAILS_SUCCESS;
  constructor(public payload?: any) {}
}
export class UpdateUserDetailsFail implements Action {
  readonly type = UpdateUserDetailsActionTypes.UPDATE_USER_DETAILS_ERROR;
  constructor(public payload?: any) {}
}
export type UpdateUserDetailsAction =
  | UpdateUserDetails
  | UpdateUserDetailsSuccess
  | UpdateUserDetailsFail;
