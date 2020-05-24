import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignsComponent } from './containers/signs/signs.component';
import { SignCreateComponent } from './components/sign-create/sign-create.component';

const routes: Routes = [
  {
    path: '',
    component: SignsComponent, // canActivate: [AuthGuard],
    children: [
      {
        path: 'create-sign',
        component: SignCreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSignRoutingModule {}
