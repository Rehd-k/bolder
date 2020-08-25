import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellersPage } from './sellers.page';

const routes: Routes = [
  {
    path: '',
    component: SellersPage
  },
  {
    path: ':sellerId',
    loadChildren: () => import('./sellers-details/sellers-details.module').then( m => m.SellersDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellersPageRoutingModule {}
