import { createSelector } from '@ngrx/store';

import { GetUserDetailsAction, GetUserDetailsActionTypes } from '../actions';
import { MillaUser } from './../../models/milla-user.model';
import {
  UpdateUserDetailsAction,
  UpdateUserDetailsActionTypes
} from './../actions/update-user-details.actions';

export interface State {
  user: MillaUser;
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  user: {},
  error: null,
  loading: false
};

export function UserReducer(
  state = initialState,
  action: GetUserDetailsAction | UpdateUserDetailsAction
): State {
  switch (action.type) {
    case UpdateUserDetailsActionTypes.UPDATE_USER_DETAILS:
    case GetUserDetailsActionTypes.GET_USER_DETAILS: {
      return {
        ...state,
        loading: true
      };
    }
    case UpdateUserDetailsActionTypes.UPDATE_USER_DETAILS_SUCCESS:
    case GetUserDetailsActionTypes.GET_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false
      };
    }
    case UpdateUserDetailsActionTypes.UPDATE_USER_DETAILS_ERROR:
    case GetUserDetailsActionTypes.GET_USER_DETAILS_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
}
// export const StarredPropertiesList = (state: State) =>
//   state.starredPropertiesList;
// export const StarredPropertiesCount = (state: State) =>
//   state.starredPropertiesList.length;
// export const StarredPropertyIsLoading = (state: State) => state.loading;
// export const StarredPropertyError = (state: State) => state.error;
