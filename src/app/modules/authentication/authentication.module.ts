import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import plugins
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

// import components
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { OnboardingDetailsComponent } from './components/onboarding-details/onboarding-details.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { AuthService } from './../../store/authentication/services/auth.services';
import { SharedModule } from '../shared/shared.module';
import { EnableNotificationComponent } from './components/enable-notification/enable-notification.component';

const COMPONENTS = [
  LoginComponent,
  OnboardingDetailsComponent,
  LoginSuccessComponent,
  EnableNotificationComponent
];
@NgModule({
  imports: [
    SharedModule,
    AuthenticationRoutingModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [COMPONENTS],
  entryComponents: [EnableNotificationComponent],
  declarations: [COMPONENTS],
  providers: [AuthService]
})
export class AuthenticationModule {}
