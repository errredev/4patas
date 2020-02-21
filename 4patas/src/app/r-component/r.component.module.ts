import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RAlertaComponent} from '../r-component/r-alerta/r-alerta.component';
import { RPerro1Component } from '../r-component/r-perro1/r-perro1.component';
import { RLoadingComponent } from '../r-component/r-loading/r-loading.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
    ],
    declarations: [
        RAlertaComponent,
        RPerro1Component,
        RLoadingComponent
    ],
    exports: [
        RAlertaComponent,
        RPerro1Component,
        RLoadingComponent
    ],
    entryComponents: [],
})
export class RComponentsModule {

}
