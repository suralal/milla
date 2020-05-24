import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';

import { AuthService } from './../../../../store/authentication/services/auth.services';
import { countriesCallingCodes } from './../../../shared/services/country/country-calling-code';
import { LocalStorageService } from './../../../shared/services/localstorage.services';
import { GetUserDetails, State } from '../../../../store/authentication';

@Component({
  selector: 'milla-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  otpConfirmationStatus: string;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  countriesCallingCodes: any;
  phonenumberForm: FormGroup;
  modalRef: BsModalRef;
  otpGroup: FormGroup;
  showSmsTemplate = true;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private store: Store<State>,
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.phonenumberForm = this.fb.group({
      countryCode: ['', Validators.required],
      phonenumber: ['', Validators.required]
    });
    this.otpGroup = this.fb.group({
      bOne: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bTwo: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bThree: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bFour: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bFive: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bSix: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]]
    });

    this.countriesCallingCodes = countriesCallingCodes;

    // set the recaptcha verifier
  }

  openSmsModel(template: TemplateRef<any>) {
    this.authService.logout();
    this.showSmsTemplate = true;
    this.modalRef = this.modalService.show(
      template
      // Object.assign({}, { class: 'gray modal-md' })
    );
    setTimeout(() => {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-login-identifier',
        {
          size: 'normal',
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        }
      );
      // we need to render it
      this.recaptchaVerifier.render();
    }, 1000);
  }

  sendSms() {
    if (this.phonenumberForm.valid) {
      const formData = this.phonenumberForm.value;
      formData.phone = `+${formData.countryCode}${formData.phonenumber}`;
      this.authService
        .signInWithPhone(formData.phone, this.recaptchaVerifier)
        .then(
          res => {
            // after sign in with phone update the user details in server to know if this phone is already used
            // this.store.dispatch(new UpdateUserDetails(formData));
            this.showSmsTemplate = false;
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.validateForm('phonenumberForm');
    }
  }

  signInWith(type) {
    this.authService.logout();
    if (type === 'google') {
      this.authService.signInWithGoogle();
    } else if (type === 'facebook') {
      this.authService.signInWithFacebook();
    }
  }

  verifyOTP(otpTemplate) {
    if (this.otpGroup.valid) {
      const OtpValue =
        this.otpGroup.value.bOne +
        this.otpGroup.value.bTwo +
        this.otpGroup.value.bThree +
        this.otpGroup.value.bFour +
        this.otpGroup.value.bFive +
        this.otpGroup.value.bSix;

      this.otpGroup.reset();
      console.log(OtpValue);
      this.authService
        .verifyOTPConfirmation(OtpValue)
        .then(result => {
          // User signed in successfully.
          this.localStorageService.setProvider(
            result.additionalUserInfo.providerId
          );

          this.otpConfirmationStatus = 'Otp Confirmed';
          this.firebaseAuth.idToken.subscribe(token => {
            this.localStorageService.setUserToken(token);
            const formData = this.phonenumberForm.value;
            formData.phone = `+${formData.countryCode}${formData.phonenumber}`;
            this.localStorageService.setUserDetails({ phone: formData.phone });
            this.store.dispatch(new GetUserDetails());
          });
          this.modalRef.hide();
        })
        .catch(function(error) {
          // User couldn't sign in (bad verification code?)

          this.otpConfirmationStatus = 'Otp Confirmed';
        });
    } else {
      this.validateForm('otpGroup');
    }
  }
  validateForm(form) {
    Object.keys(this[form].controls).forEach(field => {
      const control = this[form].get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  onKey(element: any) {
    const txt = element.target.value;
    const _id = element.target.id;
    // tslint:disable-next-line:radix
    let last_char = parseInt(_id.slice(-1));
    last_char = last_char + 1;
    if (txt.length === 1) {
      if (document.getElementById('box' + last_char)) {
        document.getElementById('box' + last_char).focus();
      }
    }
  }
}
