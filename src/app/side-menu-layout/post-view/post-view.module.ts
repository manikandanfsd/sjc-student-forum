import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostViewPageRoutingModule } from './post-view-routing.module';

import { QuillModule } from 'ngx-quill';

import { PostViewPage } from './post-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostViewPageRoutingModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
      },
    }),
  ],
  declarations: [PostViewPage],
})
export class PostViewPageModule {}
