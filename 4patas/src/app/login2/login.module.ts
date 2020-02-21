import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RComponentsModule } from '../r-component/r.component.module';
import { EntrarComponent } from './components/entrar/entrar.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RComponentsModule
  ],
  declarations: [LoginPage, EntrarComponent ]
})
export class LoginPageModule {}
