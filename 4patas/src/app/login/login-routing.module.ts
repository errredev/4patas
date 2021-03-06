import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { EntrarComponent} from './components/entrar/entrar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReiniciarComponent } from './components/reiniciar/reiniciar.component';
const routes: Routes = [
  {
    path: '', redirectTo: '/login/entrar', pathMatch: 'full'
  },
  {
    path: '',
    component: LoginPage,
    children: [
      {
        path: 'entrar',
        component: EntrarComponent,
        data: { animation: 'isRight' }
      },
      {
        path: 'registro',
        component: RegistroComponent,
          data: { animation: 'isRight' }
      },
      {
        path: 'olvido',
        component: ReiniciarComponent,
        data: { animation: 'isRight' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
