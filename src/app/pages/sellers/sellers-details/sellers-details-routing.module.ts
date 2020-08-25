import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellersDetailsPage } from './sellers-details.page';

const routes: Routes = [
  {
    path: '',
    component: SellersDetailsPage
  },
  {
    path: 'seller-reviews',
    loadChildren: () => import('./seller-reviews/seller-reviews.module').then( m => m.SellerReviewsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellersDetailsPageRoutingModule {}
