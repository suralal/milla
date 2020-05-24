/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateNetworkComponent } from './create-network.component';

describe('CreateNetworkComponent', () => {
  let component: CreateNetworkComponent;
  let fixture: ComponentFixture<CreateNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
