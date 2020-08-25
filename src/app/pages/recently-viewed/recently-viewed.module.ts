import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentlyViewedPageRoutingModule } from './recently-viewed-routing.module';

import { RecentlyViewedPage } from './recently-viewed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentlyViewedPageRoutingModule
  ],
  declarations: [RecentlyViewedPage]
})
export class RecentlyViewedPageModule {}
