import { LoginPinComponent } from './components/login-pin/login-pin.component';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardTimeLineComponent } from './components/dashboard-time-line/dashboard-time-line.component';
import { ViewDashboardComponent } from './containers/view-dashboard/view-dashboard.component';
import { DashboardSignDetailsComponent } from './components/dashboard-sign-details/dashboard-sign-details.component';
import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [
  DashboardTimeLineComponent,
  ViewDashboardComponent,
  DashboardSignDetailsComponent,
  LoginPinComponent
];
@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [COMPONENTS],
  entryComponents: [LoginPinComponent]
})
export class DashboardModule {}
