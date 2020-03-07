import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { escalonado } from '../animations/escalonado.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [ escalonado]
})
export class HomePage implements OnInit {
  avisos = [
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Rafa', nombre: 'Charly', distancia: ' 370 Mts',
      multiplesFotos: true, portada: './assets/demo/perro1.jpg',
      vistas: 134, seguimiento: 3, difundido: 4, creacion: '1 de enero', dias: 3, tags: [
        'mestizos', 'adulto', 'Saludable', 'Mediano']
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Yayita', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro2.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', dias: 10, tags: [
        'mestizos', 'cachorro', 'Saludable', 'Mediano'
      ]
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Cholo', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro3.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', dias: 9, tags: [
        'mestizos', 'senior', 'Saludable', 'Mediano'
      ]
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Yayita', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro4.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', dias: 31, tags: [
        'mestizos', 'cachorro', 'Saludable', 'Mediano'
      ]
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Cholo', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro1.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', dias: 1, tags: [
        'mestizos', 'senior', 'Saludable', 'Mediano'
      ]
    }
  ];
  public user: firebase.User;
  constructor(private menu: MenuController,
              public authSrv: AuthService) { }

  ngOnInit() {
    this.authSrv.userData$.subscribe(user => {
      // console.log(user.email);
      this.user = user;

    });
  }
  abrirMenu() {
    this.menu.enable(true, 'star');
    this.menu.open('start');
  }
}
