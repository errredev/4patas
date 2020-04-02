import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AppService } from '../../app/services/app/app.service';
import { Seleccion } from '../animations/selection.animations';
import {ThemeService} from '../services/theme/theme.service';
@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
  animations: [Seleccion ]
})
export class TabnavPage implements OnInit {
  ultimo = 4;
  public tabOpcion = [{ nombre: 'home', estado: 'inicial', indice: 0, selec: false, colorIcon: '', colorBoton: ''  },
    { nombre: 'avisos', estado: 'inicial', indice: 1, selec: false, colorIcon: '', colorBoton: ''},
    { nombre: 'mensajes', estado: 'inicial', indice: 2, colorIcon: '', colorBoton: ''}];

  constructor(public svcloading: AppService, public themeSrv: ThemeService) {
    this.tabOpcion[0].colorIcon = this.themeSrv.contrast;
    this.tabOpcion[1].colorIcon = this.themeSrv.contrast;
    this.tabOpcion[2].colorIcon = this.themeSrv.contrast;
    this.tabOpcion[0].colorBoton = this.themeSrv.light;
    this.tabOpcion[1].colorBoton = this.themeSrv.light;
    this.tabOpcion[2].colorBoton = this.themeSrv.light;
  }

  ngOnInit() {
    this.svcloading.ponermenu();
  }
  push(opcion) {
    this.tabOpcion[opcion].estado = 'ok';
    this.tabOpcion[opcion].colorIcon = this.themeSrv.medium;
    this.tabOpcion[opcion].colorBoton = this.themeSrv.dark;
    this.tabOpcion[opcion].selec = true;
    if (this.ultimo < 4) {
      this.tabOpcion[this.ultimo].colorIcon = this.themeSrv.contrast;
      this.tabOpcion[this.ultimo].colorBoton = this.themeSrv.light;
      this.tabOpcion[this.ultimo].estado = 'inicial';
      this.tabOpcion[this.ultimo].selec = false;
    }
    console.log(this.tabOpcion[opcion].colorIcon);
    this.ultimo = opcion;
  }

}
