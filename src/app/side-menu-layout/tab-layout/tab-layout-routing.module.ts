import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TabLayoutPage } from './tab-layout.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tab-layout',
    pathMatch: 'full',
  },
  {
    path: 'tab-layout',
    component: TabLayoutPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'circular',
        loadChildren: () =>
          import('./circular/circular.module').then(
            (m) => m.CircularPageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'saved',
        loadChildren: () =>
          import('./saved-post/saved-post.module').then(
            (m) => m.SavedPostPageModule
          ),
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'my-feeds',
        loadChildren: () =>
          import('./my-feeds/my-feeds.module').then((m) => m.MyFeedsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
})
export class TabLayoutPageRoutingModule {}
