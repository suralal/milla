import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryListComponent } from './components/library-list/library-list.component';
import { ViewLibraryComponent } from './containers/view-library/view-library.component';
import { AllSignsComponent } from './components/all-signs/all-signs.component';

const routes: Routes = [
  {
    path: '',
    component: ViewLibraryComponent, // canActivate: [AuthGuard],
    children: [
      {
        path: 'library-list',
        component: LibraryListComponent
      },
      {
        path: 'all-signs',
        component: AllSignsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}
