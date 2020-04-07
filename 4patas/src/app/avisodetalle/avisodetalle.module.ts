import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { IonicModule } from '@ionic/angular';
import {CaruselFotosComponent} from '../r-component/carusel-fotos/carusel-fotos.component'
import { AvisodetallePageRoutingModule } from './avisodetalle-routing.module';

import { AvisodetallePage } from './avisodetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularSvgIconModule,
    AvisodetallePageRoutingModule
  ],
  declarations: [AvisodetallePage, CaruselFotosComponent]
})
export class AvisodetallePageModule {}
