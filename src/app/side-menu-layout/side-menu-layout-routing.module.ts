import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuLayoutPage } from './side-menu-layout.page';

const routes: Routes = [
  {
    path: '',
    component: SideMenuLayoutPage,
    loadChildren: () =>
      import('./tab-layout/tab-layout.module').then(
        (m) => m.TabLayoutPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuLayoutPageRoutingModule {}
