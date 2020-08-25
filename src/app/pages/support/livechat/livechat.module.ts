import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivechatPageRoutingModule } from './livechat-routing.module';

import { LivechatPage } from './livechat.page';
import { AutosizeModule } from 'ngx-autosize';
import { FaqsModule } from 'src/app/shared/faqs/faqs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivechatPageRoutingModule,
    AutosizeModule,
    FaqsModule
  ],
  declarations: [LivechatPage]
})
export class LivechatPageModule {}
