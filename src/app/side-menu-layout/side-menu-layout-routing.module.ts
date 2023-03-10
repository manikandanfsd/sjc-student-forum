import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuLayoutPage } from './side-menu-layout.page';

const routes: Routes = [
  {
    path: '',
    component: SideMenuLayoutPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./tab-layout/tab-layout.module').then(
            (m) => m.TabLayoutPageModule
          ),
      },
      {
        path: 'add-edit-post',
        loadChildren: () =>
          import('./add-edit-post/add-edit-post.module').then(
            (m) => m.AddEditPostPageModule
          ),
      },
      {
        path: 'post-view/:postId',
        loadChildren: () =>
          import('./post-view/post-view.module').then(
            (m) => m.PostViewPageModule
          ),
      },
      {
        path: 'help',
        loadChildren: () =>
          import('./help/help.module').then((m) => m.HelpPageModule),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./user-management/user-management.module').then(
            (m) => m.UserManagementPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuLayoutPageRoutingModule {}
