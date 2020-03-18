import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearavisoPageRoutingModule } from './crearaviso-routing.module';

import { CrearavisoPage } from './crearaviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearavisoPageRoutingModule
  ],
  declarations: [CrearavisoPage]
})
export class CrearavisoPageModule {}
