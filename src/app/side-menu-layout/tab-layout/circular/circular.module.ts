import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwiperModule } from 'swiper/angular';

import { CircularPageRoutingModule } from './circular-routing.module';

import { CircularPage } from './circular.page';

import { IonicSlides } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircularPageRoutingModule,
    SwiperModule,
  ],
  declarations: [CircularPage],
})
export class CircularPageModule {}
