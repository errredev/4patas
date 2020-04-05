import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import { useAnimation } from '@angular/animations';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabnav',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tabnav',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabnav/tabnav.module').then(m => m.TabnavPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'crearaviso',
    canActivate: [AuthGuard],
    loadChildren: () => import('./crearaviso/crearaviso.module').then( m => m.CrearavisoPageModule)
  },
  {
    path: 'entrar',
    loadChildren: () => import('./entrar/entrar.module').then( m => m.EntrarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
