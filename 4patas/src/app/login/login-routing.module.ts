import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { EntrarComponent} from './components/entrar/entrar.component';
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
        component: EntrarComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
