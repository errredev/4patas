import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app/services/app/app.service';
import { Seleccion } from '../animations/selection.animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
  animations: [Seleccion ]
})
export class TabnavPage implements OnInit {
  ultimo :number = 0;
  public tabOpcion = [{ nombre: 'home', estado: 'inicial', indice: 0, selec: false, colorIcon: '', colorBoton: ''  },
    { nombre: 'avisos', estado: 'inicial', indice: 1, selec: false, colorIcon: '', colorBoton: ''},
    { nombre: 'mensajes', estado: 'inicial', indice: 2, colorIcon: '', colorBoton: ''}];

  constructor(public svcloading: AppService, public srvApp: AppService, private router:Router) {
    this.tabOpcion[0].colorIcon = this.srvApp.contrast;
    this.tabOpcion[1].colorIcon = this.srvApp.contrast;
    this.tabOpcion[2].colorIcon = this.srvApp.contrast;
    this.tabOpcion[0].colorBoton = this.srvApp.light;
    this.tabOpcion[1].colorBoton = this.srvApp.light;
    this.tabOpcion[2].colorBoton = this.srvApp.light;
  }

  ngOnInit() {
    this.srvApp.darkMode$.subscribe (valor => {
      this.tabOpcion[0].colorIcon = this.srvApp.contrast;
      this.tabOpcion[1].colorIcon = this.srvApp.contrast;
      this.tabOpcion[2].colorIcon = this.srvApp.contrast;
      this.tabOpcion[this.ultimo].colorIcon = this.srvApp.medium;
      console.log('cambie de modo')
    })
    this.router.navigate ([''])
    this.svcloading.ponermenu();
    this.tabOpcion[0].estado = 'ok';
    this.tabOpcion[0].colorIcon = this.srvApp.medium;
    this.tabOpcion[0].colorBoton = this.srvApp.primary;
    this.tabOpcion[0].selec = true;
  }
  push(opcion) {
    if (this.ultimo !== opcion) {
      this.tabOpcion[opcion].estado = 'ok';
      this.tabOpcion[opcion].colorIcon = this.srvApp.medium;
      this.tabOpcion[opcion].colorBoton = this.srvApp.primary;
      this.tabOpcion[opcion].selec = true;
      if (this.ultimo < 4) {
        this.tabOpcion[this.ultimo].colorIcon = this.srvApp.contrast;
        this.tabOpcion[this.ultimo].colorBoton = this.srvApp.light;
        this.tabOpcion[this.ultimo].estado = 'inicial';
        this.tabOpcion[this.ultimo].selec = false;
      }
      console.log(this.tabOpcion[opcion].colorIcon);
      this.ultimo = opcion;
    }
  }

}
