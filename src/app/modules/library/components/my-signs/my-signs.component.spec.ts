/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MySignsComponent } from './my-signs.component';

describe('MySignsComponent', () => {
  let component: MySignsComponent;
  let fixture: ComponentFixture<MySignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
