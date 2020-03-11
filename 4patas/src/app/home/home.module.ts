import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { RComponentsModule } from '../r-component/r.component.module';
import { AvisoComponent } from '../avisos/aviso/aviso.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RComponentsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, AvisoComponent]
})
export class HomePageModule {}
