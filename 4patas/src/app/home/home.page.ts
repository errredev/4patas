import { Component, OnInit } from '@angular/core';
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
      vistas: 134, seguimiento: 3, difundido: 4, creacion: '1 de enero', tags: [
        'mestizos', 'adulto', 'Saludable', 'Mediano']
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Yayita', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro2.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', tags: [
        'mestizos', 'cachorro', 'Saludable', 'Mediano'
      ]
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Cholo', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro3.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', tags: [
        'mestizos', 'senior', 'Saludable', 'Mediano'
      ]
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Yayita', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro4.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', tags: [
        'mestizos', 'cachorro', 'Saludable', 'Mediano'
      ]
    },
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Laura', nombre: 'Cholo', distancia: '1 Km',
      multiplesFotos: true, portada: './assets/demo/perro1.jpg',
      vistas: 14, seguimiento: 1, difundido: 4, creacion: '16 de enero', tags: [
        'mestizos', 'senior', 'Saludable', 'Mediano'
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
