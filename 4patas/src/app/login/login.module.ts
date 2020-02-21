import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RComponentsModule } from '../r-component/r.component.module';
import {EntrarComponent} from './components/entrar/entrar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReiniciarComponent } from './components/reiniciar/reiniciar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RComponentsModule
  ],
  declarations: [LoginPage, EntrarComponent, RegistroComponent, ReiniciarComponent]
})
export class LoginPageModule {}
