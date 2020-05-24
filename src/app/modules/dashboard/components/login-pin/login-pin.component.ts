import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidatePINService } from '../../../../store/network';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'milla-login-pin',
  templateUrl: './login-pin.component.html',
  styleUrls: ['./login-pin.component.scss']
})
export class LoginPinComponent implements OnInit {
  pinError: any;
  pinGroup: FormGroup;
  public modalRef: BsModalRef;
  @Input() nextID;
  @Output() pinValidated: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private validatePINService: ValidatePINService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.initialiseOTPform();
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
  initialiseOTPform() {
    this.pinGroup = this.fb.group({
      bOne: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bTwo: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bThree: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]],
      bFour: ['', [Validators.required, Validators.pattern('[0-9]{0,1}')]]
    });
  }

  verifyPIN() {
    this.pinError = '';
    if (this.pinGroup.valid) {
      const PinValue =
        this.pinGroup.value.bOne +
        this.pinGroup.value.bTwo +
        this.pinGroup.value.bThree +
        this.pinGroup.value.bFour;

      // this.pinGroup.reset();
      this.validatePINService
        .validatePIN({ pinCode: PinValue }, this.nextID)
        .subscribe(
          res => {
            this.pinValidated.emit(true);
          },
          err => {
            console.log(err);
            this.pinError = err.field + ' ' + err.message;
          }
        );
    } else {
      this.pinError = 'Invalid';
    }
  }
  resetPin() {
    this.pinValidated.emit(false);
  }
}
