import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellersDetailsPageRoutingModule } from './sellers-details-routing.module';

import { SellersDetailsPage } from './sellers-details.page';

import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellersDetailsPageRoutingModule,
    AutosizeModule
  ],
  declarations: [SellersDetailsPage]
})
export class SellersDetailsPageModule {}
