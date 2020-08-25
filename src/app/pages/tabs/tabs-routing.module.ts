import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthguardService } from 'src/app/services/authguard.service';

const routes: Routes = [
  {
    path: 'bavy',
    component: TabsPage,
    children: [
      {
        path: 'index',
        loadChildren: () =>
          import('../index/index.module').then((m) => m.IndexPageModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../categories/categories.module').then(
            (m) => m.CategoriesPageModule
          ),
      },
      {
        path: 'sellers',
        loadChildren: () =>
          import('../sellers/sellers.module').then((m) => m.SellersPageModule),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('../support/support.module').then((m) => m.SupportPageModule),
          // canActivate: [AuthguardService]
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../account/account.module').then((m) => m.AccountPageModule),
          canActivate: [AuthguardService],
      }
    ],
  },
  {
    path: '',
    redirectTo: 'bavy/index',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
