import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisavisosPageRoutingModule } from './misavisos-routing.module';

import { MisavisosPage } from './misavisos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisavisosPageRoutingModule
  ],
  declarations: [MisavisosPage]
})
export class MisavisosPageModule {}
