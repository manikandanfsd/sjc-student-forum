import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFeedsPageRoutingModule } from './my-feeds-routing.module';

import { MyFeedsPage } from './my-feeds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFeedsPageRoutingModule
  ],
  declarations: [MyFeedsPage]
})
export class MyFeedsPageModule {}
