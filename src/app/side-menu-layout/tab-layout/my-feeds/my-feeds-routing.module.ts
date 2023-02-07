import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFeedsPage } from './my-feeds.page';

const routes: Routes = [
  {
    path: '',
    component: MyFeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFeedsPageRoutingModule {}
