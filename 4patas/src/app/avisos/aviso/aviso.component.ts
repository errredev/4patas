import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
})
export class AvisoComponent implements OnInit {
  @Input() aviso: any;
  public unAviso =
    {
      idfb: '1241412342', idususario: '1212412', nombreUsuario: 'Rafa', nombre: 'Charly', distancia: ' 370 Mts',
      multiplesFotos: true, portada: './assets/demo/perro1.jpg',
      vistas: 134, seguimiento: 3, difundido: 4, creacion: '1 de enero', dias: 3, tags: [
        'mestizos', 'adulto', 'Saludable', 'Mediano']
    };
  constructor() {
    this.aviso = this.unAviso;
  }

  ngOnInit() {}

}
