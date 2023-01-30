import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabLayoutPageRoutingModule } from './tab-layout-routing.module';

import { TabLayoutPage } from './tab-layout.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabLayoutPageRoutingModule],
  declarations: [TabLayoutPage],
})
export class TabLayoutPageModule {}
