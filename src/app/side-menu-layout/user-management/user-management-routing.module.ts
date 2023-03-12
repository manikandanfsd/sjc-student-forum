import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManagementPage } from './user-management.page';

const routes: Routes = [
  {
    path: '',
    component: UserManagementPage,
  },
  {
    path: 'add-user',
    loadChildren: () =>
      import('./add-user/add-user.module').then((m) => m.AddUserPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementPageRoutingModule {}
