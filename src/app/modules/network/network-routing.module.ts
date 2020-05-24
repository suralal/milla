import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewNetworkComponent } from './components/view-network/view-network.component';
import { CreateNetworkComponent } from './components/create-network/create-network.component';
import { InviteMembersComponent } from './components/invite-members/invite-members.component';

const routes: Routes = [
  {
    path: 'network-view',
    component: ViewNetworkComponent
  },
  {
    path: 'create-network',
    component: CreateNetworkComponent
  },
  {
    path: 'edit-network/:id',
    component: CreateNetworkComponent
  },
  {
    path: 'invite-members',
    component: InviteMembersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule {}
