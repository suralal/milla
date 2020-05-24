import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './modules/shared/shared.module';
import { AppStoreModule } from './store/store.module';
import { AuthGuard } from './utils/auth/auth-guard.service';
import { environment } from '../environments/environment';
import { FIREBASE_KEY } from './utils/config';
import { TokenInterceptor } from './utils/auth/token.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(FIREBASE_KEY),
    AngularFireAuthModule,
    AppStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
