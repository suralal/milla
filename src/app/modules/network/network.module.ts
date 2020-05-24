import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkRoutingModule } from './network-routing.module';
import { ViewNetworkComponent } from './components/view-network/view-network.component';
import { CreateNetworkComponent } from './components/create-network/create-network.component';
import { InviteMembersComponent } from './components/invite-members/invite-members.component';

import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [
  ViewNetworkComponent,
  CreateNetworkComponent,
  InviteMembersComponent
];
@NgModule({
  imports: [SharedModule, NetworkRoutingModule],
  exports: [COMPONENTS],
  entryComponents: [],
  declarations: [COMPONENTS],
  providers: []
})
export class NetworkModule {}
