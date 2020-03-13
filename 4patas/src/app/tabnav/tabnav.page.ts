import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AppService } from '../../app/services/app/app.service';
import { Seleccion } from '../animations/selection.animations';

@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
  animations: [Seleccion ]
})
export class TabnavPage implements OnInit {
  ultimo = 4;
  public tabOpcion = [{ nombre: 'home', estado: 'inicial', indice: 0, selec: false, colorIcon: '#8d8c895b' },
    { nombre: 'avisos', estado: 'inicial', indice: 1, selec: false, colorIcon: '#8d8c895b'},
    { nombre: 'mensajes', estado: 'inicial', indice: 2, colorIcon: '#8d8c895b'}];

  constructor(public svcloading: AppService) { }

  ngOnInit() {
    this.svcloading.ponermenu();
  }
  push(opcion) {
    this.tabOpcion[opcion].estado = 'ok';
    this.tabOpcion[opcion].selec = true;
    if (this.ultimo < 4) {
      this.tabOpcion[this.ultimo].colorIcon = '#8d8c895b';
      this.tabOpcion[this.ultimo].estado = 'inicial';
    }
    console.log(this.tabOpcion[opcion].colorIcon);
    this.ultimo = opcion;
  }

}
