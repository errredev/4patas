import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RAlertaComponent} from '../r-component/r-alerta/r-alerta.component';
import { RPerro1Component } from '../r-component/r-perro1/r-perro1.component';
import { RLoadingComponent } from '../r-component/r-loading/r-loading.component';
import { RMenuUsuarioComponent} from '../r-component/r-menu-usuario/r-menu-usuario.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
    ],
    declarations: [
        RAlertaComponent,
        RPerro1Component,
        RLoadingComponent,
        RMenuUsuarioComponent
    ],
    exports: [
        RAlertaComponent,
        RPerro1Component,
        RLoadingComponent,
        RMenuUsuarioComponent
    ],
    entryComponents: [],
})
export class RComponentsModule {

}
