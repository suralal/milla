import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDashboardComponent } from './containers/view-dashboard/view-dashboard.component';
import { DashboardSignDetailsComponent } from './components/dashboard-sign-details/dashboard-sign-details.component';
import { DashboardTimeLineComponent } from './components/dashboard-time-line/dashboard-time-line.component';

const routes: Routes = [
  {
    path: '',
    component: ViewDashboardComponent, // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'time-line'
      },
      {
        path: 'time-line',
        component: DashboardTimeLineComponent
      },
      {
        path: 'sign-details',
        component: DashboardSignDetailsComponent
      },
      {
        path: 'sign',
        loadChildren:
          'app/modules/create-sign/create-sign.module#CreateSignModule'
      },
      {
        path: 'library',
        loadChildren: 'app/modules/library/library.module#LibraryModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
