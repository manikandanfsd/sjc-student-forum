import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SideMenuLayoutPageRoutingModule } from './side-menu-layout-routing.module';

import { SideMenuLayoutPage } from './side-menu-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SideMenuLayoutPageRoutingModule
  ],
  declarations: [SideMenuLayoutPage]
})
export class SideMenuLayoutPageModule {}
