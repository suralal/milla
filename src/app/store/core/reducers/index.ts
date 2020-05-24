import { ActionReducerMap } from '@ngrx/store';
import * as modalReducer from './modal-status.reducer';

export interface CoreState {
  modalReducer: modalReducer.State;
}

export const CoreReducer: ActionReducerMap<CoreState> = {
  modalReducer: modalReducer.ModalStateReducer
};
