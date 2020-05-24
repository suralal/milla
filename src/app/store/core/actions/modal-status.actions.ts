import { Action } from '@ngrx/store';

export enum OpenModalActionTypes {
  OPEN_MODAL = '[MODAL] OPEN_MODAL',
  CLOSE_MODAL = '[MODAL] CLOSE_MODAL'
  // OPEN_MODAL_ERROR = '[MODAL] OPEN_MODAL_ERROR'
}
export class OpenModal implements Action {
  readonly type = OpenModalActionTypes.OPEN_MODAL;
  constructor(
    public payload?: {
      notificationModal?: boolean;
      smsModal?: boolean;
    }
  ) {}
}
export class CloseModal implements Action {
  readonly type = OpenModalActionTypes.CLOSE_MODAL;
  constructor(
    public payload?: {
      notificationModal?: boolean;
      smsModal?: boolean;
    }
  ) {}
}
// export class OpenModalFail implements Action {
//   readonly type = OpenModalActionTypes.OPEN_MODAL_ERROR;
//   constructor(public payload?: any) {}
// }
export type OpenModalActions = OpenModal | CloseModal;
