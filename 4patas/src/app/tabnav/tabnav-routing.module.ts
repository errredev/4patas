import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavPage } from './tabnav.page';

const routes: Routes = [
  {
    path: '', redirectTo: '/tabnav/home', pathMatch: 'full'
  },
  {
    path: '',
    component: TabnavPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'lista-mensajes',
        loadChildren: () => import('../lista-mensajes/lista-mensajes.module').then(m => m.ListaMensajesPageModule)
      },
      {
        path: 'crearaviso',
        loadChildren: () => import('../crearaviso/crearaviso.module').then(m => m.CrearavisoPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
