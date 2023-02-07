import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'startup',
    pathMatch: 'full',
  },
  {
    path: 'startup',
    loadChildren: () =>
      import('./startup/startup.module').then((m) => m.StartupPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'menu-layout',
    loadChildren: () =>
      import('./side-menu-layout/side-menu-layout.module').then(
        (m) => m.SideMenuLayoutPageModule
      ),
  },
  {
    path: 'side-menu-layout',
    loadChildren: () =>
      import('./side-menu-layout/side-menu-layout.module').then(
        (m) => m.SideMenuLayoutPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
