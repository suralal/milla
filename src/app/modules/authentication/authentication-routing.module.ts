import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { OnboardingDetailsComponent } from './components/onboarding-details/onboarding-details.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'onboard',
    component: OnboardingDetailsComponent
  },
  {
    path: 'success',
    component: LoginSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
