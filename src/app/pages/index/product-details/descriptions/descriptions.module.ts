import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescriptionsPageRoutingModule } from './descriptions-routing.module';

import { DescriptionsPage } from './descriptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescriptionsPageRoutingModule
  ],
  declarations: [DescriptionsPage]
})
export class DescriptionsPageModule {}
