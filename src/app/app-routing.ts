import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './utils/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard/time-line', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: 'network',
    canActivate: [AuthGuard],
    loadChildren: 'app/modules/network/network.module#NetworkModule'
  },
  {
    path: 'auth',
    loadChildren:
      'app/modules/authentication/authentication.module#AuthenticationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
