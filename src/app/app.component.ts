import { AuthService } from './store/authentication/services/auth.services';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalStorageService } from './modules/shared/services/localstorage.services';
import { Store } from '@ngrx/store';
import { State, GetUserDetails } from './store/authentication';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'milla-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Milla-Says';
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private firebaseAuth: AngularFireAuth,
    private store: Store<State>,
    private translate: TranslateService
  ) {
    // this.firebaseAuth.idToken.subscribe(token => {
    //   if (token) {
    //     this.localStorageService.setUserToken(token);
    //     this.store.dispatch(new GetUserDetails());
    //   }
    // });

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
  logout() {
    this.authService.logout();
  }
  switchLang(l) {
    this.translate.use(l);
  }
}
