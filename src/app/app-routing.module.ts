import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'startup',
    loadChildren: () =>
      import('./startup/startup.module').then((m) => m.StartupPageModule),
  },
  {
    path: 'student-login',
    loadChildren: () =>
      import('./student-login/student-login.module').then(
        (m) => m.StudentLoginPageModule
      ),
  },
  {
    path: 'staff-login',
    loadChildren: () =>
      import('./staff-login/staff-login.module').then(
        (m) => m.StaffLoginPageModule
      ),
  },
  {
    path: 'menu-layout',
    loadChildren: () =>
      import('./side-menu-layout/side-menu-layout.module').then(
        (m) => m.SideMenuLayoutPageModule
      ),
  },
  // {
  //   path: 'tab-layout',
  //   loadChildren: () =>
  //     import('./tab-layout/tab-layout.module').then(
  //       (m) => m.TabLayoutPageModule
  //     ),
  // },
  {
    path: '',
    redirectTo: 'startup',
    pathMatch: 'full',
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
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
