import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentlyViewedPage } from './recently-viewed.page';

const routes: Routes = [
  {
    path: '',
    component: RecentlyViewedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentlyViewedPageRoutingModule {}
