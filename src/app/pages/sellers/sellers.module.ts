import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellersPageRoutingModule } from './sellers-routing.module';

import { SellersPage } from './sellers.page';

import { HeaderPageModule } from '../../shared/header/header.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellersPageRoutingModule,
    HeaderPageModule,
    ReactiveFormsModule
  ],
  declarations: [SellersPage]
})
export class SellersPageModule {}
