import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as fromCoreStore from '../../../../store/core';

@Component({
  selector: 'milla-enable-notification',
  templateUrl: './enable-notification.component.html',
  styleUrls: ['./enable-notification.component.scss']
})
export class EnableNotificationComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    public store: Store<fromCoreStore.CoreState>
  ) {}

  ngOnInit() {
    // this.notifyMe();
  }
  notifyMe() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      Notification.requestPermission().then(result => {
        console.log(result);
        if (result === 'granted') {
          this.bsModalRef.hide();
          this.store.dispatch(
            new fromCoreStore.CloseModal({ notificationModal: false })
          );
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
}
