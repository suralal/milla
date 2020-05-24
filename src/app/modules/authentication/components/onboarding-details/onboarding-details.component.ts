import { UploadImageService } from './../../../shared/services/upload-image.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

import {
  State,
  UpdateUserDetails,
  AuthService,
  GetUserDetails
} from '../../../../store/authentication';
import { LocalStorageService } from './../../../shared/services/localstorage.services';
import { PhoneService } from '../../../shared/services/phone/phone.service';
import * as fromAuthStore from '../../../../store/authentication';
import * as fromCoreStore from '../../../../store/core';
import { countriesCallingCodes } from './../../../shared/services/country/country-calling-code';
import { emailRegEx, UPDATE_USER_IMAGE_URL } from './../../../../utils/config';
import { MillaUser } from './../../../../store/models/milla-user.model';

import { EnableNotificationComponent } from './../enable-notification/enable-notification.component';
import { dataURItoBlob } from '../../../../utils/helpers';

@Component({
  selector: 'milla-onboarding-details',
  templateUrl: './onboarding-details.component.html',
  styleUrls: ['./onboarding-details.component.scss']
})
export class OnboardingDetailsComponent implements OnInit {
  fileToUploadIsReady: boolean;
  mediaStream: MediaStream;
  uploadingStatus: any;
  videoHeight: number;
  fileBrowser: any;
  formData: FormData;
  photoPreview: any;
  height: number;
  width: number;
  canvas: any;
  video: any;
  modalRef: BsModalRef;
  user: MillaUser;
  user$: Observable<MillaUser>;
  notificationModalStatus$: Observable<any>;
  GetUserDetailsErrorStatus$: Observable<any>;
  profileForm: FormGroup;
  otpGroup: FormGroup;
  profilePic: string;
  countriesCallingCodes;
  invalidPhoneNumberError = '';
  recaptchaVerifier;
  otpConfirmationStatus: string;
  uploadedProfilePic = '';

  constructor(
    private modalService: BsModalService,
    private store: Store<State>,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private phoneService: PhoneService,
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService,
    private uploadImageService: UploadImageService
  ) {
    this.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    this.height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  }

  ngOnInit() {
    this.user$ = this.store.select(fromAuthStore.GetUserDetails$);
    this.GetUserDetailsErrorStatus$ = this.store.select(
      fromAuthStore.GetUserDetailsErrorStatus$
    );
    this.notificationModalStatus$ = this.store.select(
      fromCoreStore.GetNotificationModalStatus$
    );
    this.store.dispatch(new fromAuthStore.GetUserDetails());
    this.countriesCallingCodes = countriesCallingCodes;

    // set the recaptcha verifier
    // enable this when phone number verification is enabled
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //   'recaptcha-identifier',
    //   {
    //     size: 'normal',
    //     callback: response => {
    //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //       // onSignInSubmit();
    //     }
    //   }
    // );
    // // we need to render it
    // this.recaptchaVerifier.render();
    this.user$.subscribe(user => {
      if (Object.keys(user).length) {
        this.user = user;
      } else {
        this.user = JSON.parse(this.localStorageService.getUserDetails());
      }
      this.intialiseForm(this.user);
      this.initialiseOTPform();
      this.splitPhoneNumber(this.user);
      const formData = this.profileForm.value;
      formData.phone = `+${formData.countryCode}${formData.phone}`;
      delete formData.countryCode;
    });

    // notification modal is open by dispatch inthe success effect of userdetails
    // this.notificationModalStatus$.subscribe(status => {

    //   if (status) {
    //     this.openNotifyModal();
    //   }
    // });

    this.modalService.onHide.subscribe(e => {
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(track => track.stop());
      }
    });
  }
  intialiseForm(user) {
    this.profileForm = this.fb.group({
      firstname: [
        user ? (user.firstname ? user.firstname : '') : '',
        Validators.required
      ],
      lastname: [
        user ? (user.lastname ? user.lastname : '') : '',
        Validators.required
      ],
      email: [
        user ? (user.email ? user.email : '') : '',
        [Validators.pattern(emailRegEx), Validators.required]
      ],
      phone: ['', Validators.required],
      pin: [
        '',
        [
          Validators.pattern('(?!(0000|1234|1111|1212))([0-9]{4})'),
          Validators.required
        ]
      ],
      countryCode: ['', Validators.required]
    });
    this.profilePic = user
      ? user.picture_url
        ? user.picture_url
        : '/assets/images/logo_picture_placeholder.png'
      : '/assets/images/logo_picture_placeholder.png';
  }
  initialiseOTPform() {
    this.otpGroup = this.fb.group({
      bOne: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bTwo: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bThree: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bFour: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bFive: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bSix: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]]
    });
  }
  openNotifyModal() {
    this.modalRef = this.modalService.show(
      EnableNotificationComponent,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  validateForm(form) {
    Object.keys(this[form].controls).forEach(field => {
      const control = this[form].get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  validatePhoneNumber() {
    // not working
    const phoneNumber = this.profileForm.value.phone;
    const countryCode = this.profileForm.value.countryCode;
    return this.phoneService.isValid(phoneNumber, countryCode);
  }
  countryCodeSelected(element) {}
  splitPhoneNumber(user) {
    if (user.phone) {
      this.countriesCallingCodes.find(obj => {
        const code = `+${obj.code}`;
        if (user.phone.includes(code)) {
          this.profileForm.patchValue({
            countryCode: obj.code,
            phone: user.phone.split(code)[1]
          });
        }
      });
    }
  }
  submitProfileForm(otpTemplate: TemplateRef<any>) {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      formData.phone = `+${formData.countryCode}${formData.phone}`;
      delete formData.countryCode;
      this.store.dispatch(new UpdateUserDetails(formData));
      // phone verification bypassing for now
      // this.GetUserDetailsErrorStatus$.subscribe(status => {

      //   if (status) {
      //   } else {
      //     // this.modalRef = this.modalService.show(otpTemplate);
      //     // this.authService.signInWithPhone(
      //     //   formData.phone,
      //     //   this.recaptchaVerifier
      //     // );
      //   }
      // });
    } else {
      this.validateForm('profileForm');
    }
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
      this.authService
        .verifyOTPConfirmation(OtpValue)
        .then(result => {
          // User signed in successfully.
          this.otpConfirmationStatus = 'Otp Confirmed';
          this.firebaseAuth.idToken.subscribe(token => {
            this.localStorageService.setUserToken(token);
            this.store.dispatch(new GetUserDetails());
          });
          setTimeout(() => {
            this.modalRef.hide();
          }, 2000);
        })
        .catch(function(error) {
          // User couldn't sign in (bad verification code?)

          this.otpConfirmationStatus = 'Otp Confirmed';
        });
    } else {
      this.validateForm('otpGroup');
    }

    // this.otpservice
    //   .verifyPhone({
    //     otp: OtpValue
    //   })
    //   .subscribe(resp => {
    //     this.sharedService.mobileOtp.emit(false);
    //     !!this.localStorageService.getRedirectURL()
    //       ? this.router.navigate([this.localStorageService.getRedirectURL()])
    //       : this.router.navigate(['/']);
    //   });
  }

  // uploading the profile photo
  uploadProfilePhoto(e) {
    this.fileBrowser = e.target;
    if (this.fileBrowser.files && this.fileBrowser.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.photoPreview.setAttribute('src', reader.result);
      };
      reader.readAsDataURL(this.fileBrowser.files[0]);
      this.fileToUploadIsReady = true;
    }
  }
  openShowMediaOptions(template: TemplateRef<any>) {
    // on open a new modal clear previous value
    this.fileBrowser = '';
    this.canvas = '';
    this.video = '';
    this.fileToUploadIsReady = false;

    this.modalRef = this.modalService.show(template);
    this.photoPreview = document.getElementById('photoPreview');
  }
  openCamera() {
    // Prefer camera resolution nearest to 1280x720.
    const constraints = { video: { width: this.width, height: this.height } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        this.mediaStream = mediaStream;
        this.video = document.getElementById('videoPreview');
        this.video.srcObject = this.mediaStream;
        this.video.onloadedmetadata = e => {
          this.video.play();
        };
        this.canvas = document.getElementById('canvas');
        // this.video.setAttribute('width', this.width);
        this.videoHeight =
          +this.video.videoHeight / (+this.video.videoWidth / +this.width);
        // this.video.setAttribute('height', videoHeight);

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
      })
      .catch(err => {}); // always check for errors at the end.
  }
  takePhoto() {
    this.canvas
      .getContext('2d')
      .drawImage(this.video, 0, 0, this.width, this.height);
    this.fileToUploadIsReady = true;

    this.photoPreview.setAttribute('src', this.canvas.toDataURL('image/png'));
  }
  uploadImage() {
    let data;
    this.formData = new FormData();
    if (this.fileBrowser) {
      data = this.fileBrowser.files[0];
      this.formData.append('profilePicture', data);
    } else if (this.canvas) {
      data = dataURItoBlob(this.canvas.toDataURL('image/png'));
      this.formData.append('profilePicture', data, 'profilepic.png');
    }

    if (data && this.fileToUploadIsReady) {
      this.uploadingStatus = '♨';
      this.uploadImageService
        .uploadImage(UPDATE_USER_IMAGE_URL, this.formData)
        .subscribe(
          res => {
            this.profilePic = res.picture_url;
            this.uploadingStatus = '✓';
            setTimeout(() => {
              this.modalRef.hide();
              this.uploadingStatus = '';
            }, 1000);
          },
          err => {
            this.uploadingStatus = ' ✘';
            setTimeout(() => {
              this.modalRef.hide();
              this.uploadingStatus = '';
            }, 1000);
          }
        );
    }
  }
}

// TODO
// validate pin number for server regex
