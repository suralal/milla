import { LocalStorageService } from './../../../shared/services/localstorage.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'milla-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {}
  setRegisteredStatus() {
    this.localStorageService.setUserRegisteredStatus('true');
  }
}
