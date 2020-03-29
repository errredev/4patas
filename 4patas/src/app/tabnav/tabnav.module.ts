import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabnavPageRoutingModule } from './tabnav-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { TabnavPage } from './tabnav.page';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {AvisoComponent} from './botones/aviso/aviso.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    TabnavPageRoutingModule,
  ],
  declarations: [TabnavPage, AvisoComponent]
})
export class TabnavPageModule {}
