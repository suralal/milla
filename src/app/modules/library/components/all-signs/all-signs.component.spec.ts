/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllSignsComponent } from './all-signs.component';

describe('AllSignsComponent', () => {
  let component: AllSignsComponent;
  let fixture: ComponentFixture<AllSignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
