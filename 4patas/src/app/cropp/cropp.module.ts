import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CroppPageRoutingModule } from './cropp-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { CroppPage } from './cropp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CroppPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [CroppPage]
})
export class CroppPageModule {}
