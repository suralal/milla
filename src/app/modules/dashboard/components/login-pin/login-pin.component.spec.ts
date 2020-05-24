/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginPinComponent } from './login-pin.component';

describe('LoginPinComponent', () => {
  let component: LoginPinComponent;
  let fixture: ComponentFixture<LoginPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
