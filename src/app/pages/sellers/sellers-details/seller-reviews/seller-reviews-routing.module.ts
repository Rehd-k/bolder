import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerReviewsPage } from './seller-reviews.page';

const routes: Routes = [
  {
    path: '',
    component: SellerReviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerReviewsPageRoutingModule {}
