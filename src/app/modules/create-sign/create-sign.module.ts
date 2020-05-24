import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { CreateSignRoutingModule } from './create-sign-routing.module';
import { SignCreateComponent } from './components/sign-create/sign-create.component';
import { SignsComponent } from './containers/signs/signs.component';

@NgModule({
  imports: [
    CommonModule,
    CreateSignRoutingModule,
    ButtonsModule.forRoot(),
    TypeaheadModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [SignCreateComponent, SignsComponent]
})
export class CreateSignModule {}
