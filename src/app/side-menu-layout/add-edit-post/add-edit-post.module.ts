import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditPostPageRoutingModule } from './add-edit-post-routing.module';
import { QuillModule } from 'ngx-quill';

import { AddEditPostPage } from './add-edit-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditPostPageRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
      },
    }),
  ],
  declarations: [AddEditPostPage],
})
export class AddEditPostPageModule {}
