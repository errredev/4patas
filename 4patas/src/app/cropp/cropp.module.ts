import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CroppPageRoutingModule } from './cropp-routing.module';

import { CroppPage } from './cropp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CroppPageRoutingModule
  ],
  declarations: [CroppPage]
})
export class CroppPageModule {}
