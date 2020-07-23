import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencycodesPage } from './agencycodes.page';

const routes: Routes = [
  {
    path: '',
    component: AgencycodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencycodesPageRoutingModule {}
