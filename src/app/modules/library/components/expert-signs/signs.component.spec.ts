/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignsComponent } from './signs.component';

describe('SignsComponent', () => {
  let component: SignsComponent;
  let fixture: ComponentFixture<SignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
