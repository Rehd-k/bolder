import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellerReviewsPageRoutingModule } from './seller-reviews-routing.module';

import { SellerReviewsPage } from './seller-reviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellerReviewsPageRoutingModule
  ],
  declarations: [SellerReviewsPage]
})
export class SellerReviewsPageModule {}
