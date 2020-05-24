import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SERVICES } from './authentication/services';
import { AUTH_EFFECTS, UserReducer } from './authentication';
import { CoreReducer } from './core/reducers';
import { NETWORK_SERVICES } from './network/services/index';
import { NetworksReducer } from './network/reducers';
import { NETWORK_EFFECTS } from './network';

const effects = [...AUTH_EFFECTS, ...NETWORK_EFFECTS];
@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature('user', UserReducer),
    StoreModule.forFeature('core', CoreReducer),
    StoreModule.forFeature('network', NetworksReducer)
  ],
  declarations: [],
  providers: [SERVICES, NETWORK_SERVICES]
})
export class AppStoreModule {}
