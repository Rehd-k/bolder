import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescriptionsPage } from './descriptions.page';

const routes: Routes = [
  {
    path: '',
    component: DescriptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescriptionsPageRoutingModule {}
