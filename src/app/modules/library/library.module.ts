import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { ViewLibraryComponent } from './containers/view-library/view-library.component';
import { MySignsComponent } from './components/my-signs/my-signs.component';
import { ExpertsSignsComponent } from './components/expert-signs/signs.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { AllSignsComponent } from './components/all-signs/all-signs.component';
@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    LibraryListComponent,
    ViewLibraryComponent,
    ExpertsSignsComponent,
    MySignsComponent,
    SearchListComponent,
    AllSignsComponent
  ]
})
export class LibraryModule {}
