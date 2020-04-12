import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RLoadingComponent } from '../r-component/r-loading/r-loading.component';
import { RMenuUsuarioComponent} from '../r-component/r-menu-usuario/r-menu-usuario.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
        AngularSvgIconModule,
    ],
    declarations: [
        RLoadingComponent,
        RMenuUsuarioComponent
    ],
    exports: [
        RLoadingComponent,
        RMenuUsuarioComponent
    ],
    entryComponents: [],
})
export class RComponentsModule {

}
