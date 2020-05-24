import { createSelector } from '@ngrx/store';

import {
  OpenModalActions,
  OpenModalActionTypes
} from './../actions/modal-status.actions';

export interface State {
  notificationModal?: boolean;
  smsModal?: boolean;
}

export const initialState: State = {
  notificationModal: false,
  smsModal: false
};

export function ModalStateReducer(
  state = initialState,
  action: OpenModalActions
): State {
  switch (action.type) {
    case OpenModalActionTypes.OPEN_MODAL: {
      return {
        ...state,
        ...action.payload
      };
    }
    case OpenModalActionTypes.CLOSE_MODAL: {
      return {
        ...state,
        ...action.payload
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
