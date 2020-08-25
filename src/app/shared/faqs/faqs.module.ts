import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FaqsComponent } from './faqs.component';



@NgModule({
  declarations: [FaqsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FaqsComponent]
})
export class FaqsModule { }
