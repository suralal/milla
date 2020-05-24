import { UploadImageService } from './services/upload-image.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { ChatSideNavComponent } from './components/chat-side-nav/chat-side-nav.component';

import { LocalStorageService } from './services/localstorage.services';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PhoneService } from './services/phone/phone.service';
import { LoadImageService } from './services/load-image.service';
import { HttpImageDirective } from './directives/http-image.directive';

const COMPONENTS = [
  SideMenuComponent,
  HttpImageDirective,
  ChatSideNavComponent
];
const MODULES = [ReactiveFormsModule, CommonModule, RouterModule, FormsModule];
@NgModule({
  imports: [HttpClientModule, MODULES, AccordionModule.forRoot()],
  declarations: [COMPONENTS],
  providers: [
    LocalStorageService,
    PhoneService,
    LoadImageService,
    UploadImageService
  ],
  exports: [MODULES, COMPONENTS]
})
export class SharedModule {}
