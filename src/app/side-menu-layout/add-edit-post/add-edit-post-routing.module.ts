import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditPostPage } from './add-edit-post.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditPostPageRoutingModule {}
