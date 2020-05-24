import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { LocalStorageService } from './../../../modules/shared/services/localstorage.services';
import { State } from '../reducers/user-details.reducer';
import { GetUserDetails } from '../actions';
import { MillaUser } from './../../models/milla-user.model';
import {
  cleanObject,
  formatUserProfileToMillaUser
} from '../../../utils/helpers';
import { GetUserDetails$ } from '../selectors';

@Injectable()
export class AuthService {
  private user = {};
  private userDetails: firebase.User = null;
  confirmationResult;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<State>
  ) {}

  verifyOTPConfirmation(otpCode) {
    return this.confirmationResult.confirm(otpCode);
  }
  signInWithFacebook() {
    this.signInWith(new firebase.auth.FacebookAuthProvider());
  }
  signInWithGoogle() {
    this.signInWith(new firebase.auth.GoogleAuthProvider());
  }
  signInWithPhone(phoneNumber, verifier) {
    return this.firebaseAuth.auth
      .signInWithPhoneNumber(phoneNumber, verifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.confirmationResult = confirmationResult;
        return confirmationResult;
      })
      .catch(function(error) {
        // Error; SMS not sent
        // ...
        return error;
      });
  }
  signInWith(provider) {
    this.firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.firebaseAuth.idToken.subscribe(token => {
          // sometimes returning null. y?
          if (token) {
            this.localStorageService.setUserToken(token);
            this.store.dispatch(new GetUserDetails());
            this.router.navigate(['/dashboard']);
          }
        });
        const profile = formatUserProfileToMillaUser(
          res.additionalUserInfo.profile
        );
        this.localStorageService.setProvider(res.additionalUserInfo.providerId);
        this.localStorageService.setUserDetails(profile);
      })
      .catch(err => {
        console.log(err);
      });
  }
  logout() {
    this.firebaseAuth.auth.signOut().then(res => {
      this.router.navigate(['/auth/login']);
      this.localStorageService.clearLocalStorage();
    });
  }
}
