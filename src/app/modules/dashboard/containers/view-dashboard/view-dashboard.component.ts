import { NetworksState } from './../../../../store/network/reducers/index';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  GetUserDetails$,
  GetUserDetails
} from '../../../../store/authentication';
import { GetNetworks, GetUserNetworks$ } from '../../../../store/network';
import { MillaNetwork } from '../../../../store/models/milla-network.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
// import { LoginPinComponent } from '../../components/login-pin/login-pin.component';

@Component({
  selector: 'milla-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss']
})
export class ViewDashboardComponent implements OnInit {
  nextSelected = 0;
  nextID: string;
  networks: MillaNetwork[];
  currentSelectedNetwork: MillaNetwork;
  networks$: Store<MillaNetwork[]>;
  user$: Store<any>;
  currentSelected = 0;
  modalRef: BsModalRef;
  @ViewChild('EnterPin') EnterPin: ElementRef;

  constructor(
    private userStore: Store<State>,
    private networkStore: Store<NetworksState>,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userStore.dispatch(new GetUserDetails());
    this.networkStore.dispatch(new GetNetworks());

    this.user$ = this.userStore.select(GetUserDetails$);
    this.networks$ = this.networkStore.select(GetUserNetworks$);

    this.networks$.subscribe(networks => {
      this.networks = networks;
      this.setCurrentSelected();
    });
  }
  setCurrentSelected() {
    this.nextID = this.networks[this.nextSelected]
      ? this.networks[this.nextSelected].id
      : '';
    this.currentSelected = this.nextSelected;
    this.currentSelectedNetwork = this.networks[this.currentSelected];
  }
  activateNetwork(number) {
    if (number !== this.currentSelected) {
      this.modalRef = this.modalService.show(this.EnterPin);
      this.nextSelected = number;
    }
  }
  pinValidated(isValidated) {
    this.modalRef.hide();
    if (isValidated) {
      this.setCurrentSelected();
    } else {
      this.router.navigate(['/auth/onboard']);
    }
  }
}
