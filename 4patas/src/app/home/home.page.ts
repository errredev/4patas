import { Component, OnInit, NgZone } from '@angular/core';
import { MenuController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { escalonado } from '../animations/escalonado.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [ escalonado]
})
export class HomePage implements OnInit {
  public size = 'Tamaño';
  public sexo = 'Sexo';
  public edad = 'Edad';
  public salud = 'Salud';
  public swtSize = false;
  public swtSexo = false;
  public swtEdad = false;
  public swtSalud = false;
  // opcionesBusqueda = [{opcion: 'Tamaño', eleccion: '', opciones: ['Pequeño', 'Mediano', 'Grande']},
  //                     { opcion: 'Sexo', eleccion: '', opciones: ['Hembra', 'Macho']},
  //                     { opcion: 'Edad', opciones: ['Cachorro', 'Joven', 'Adulto', 'Senior'] },
  //                     { opcion: 'Salud', opciones: ['Saludable', 'Cuidados iniciales', 'Cuidados Siempre'] }];
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
              public authSrv: AuthService,
              private actSheet: ActionSheetController,
              private ngZone: NgZone) { }

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

  async opcionesTamano() {

    const actionSheet = await this.actSheet.create({
      header: 'Tamaño',
      buttons: [{
        text: 'Pequeño',


        handler: () => {
          this.ngZone.run(() => {
            this.size = 'Pequeño';
            this.swtSize = true;
          });
        }
      }, {
        text: 'Mediano',
        handler: () => {
          this.ngZone.run(() => {
            this.size = 'Mediano';
            this.swtSize = true;
          });
        }
      }, {
        text: 'Grande',
        handler: () => {
            this.ngZone.run(() => {
            this.size = 'Grande';
            this.swtSize = true;
          });
        }
      },
        {
          text: 'Todos',
          handler: () => {
            this.ngZone.run(() => {
              this.size = 'Tamaño';
              this.swtSize = false;
            });
          }
        }]
    });
    await actionSheet.present();
  }

  async opcionesSexo() {

    const actionSheet = await this.actSheet.create({
      header: 'Sexo',
      buttons: [{
        text: 'Hembra',
  

        handler: () => {
          this.ngZone.run(() => {
            this.sexo = 'Hembra';
            this.swtSexo = true;
          });
        }
      }, {
        text: 'Macho',
        handler: () => {
          this.ngZone.run(() => {
            this.sexo = 'Macho';
            this.swtSexo = true;
          });
        }
      },
        {
          text: 'Todos',
          handler: () => {
            this.ngZone.run(() => {
              this.sexo = 'Sexo';
              this.swtSexo = false;
            });
          }
        }]
    });
    await actionSheet.present();
  }

  async opcionesEdad() {
    const actionSheet = await this.actSheet.create({
      header: 'Edad',
      buttons: [{
        text: 'Cachorro',
 

        handler: () => {
          this.ngZone.run(() => {
            this.swtEdad = true;
            this.edad = 'Cachorro';
          });
        }
      }, {
        text: 'Adulto',
        handler: () => {
          this.ngZone.run(() => {
            this.swtEdad = true;
            this.edad = 'adulto';
          });
        }
      },
      {
        text: 'Senior',
        handler: () => {
          this.ngZone.run(() => {
            this.swtEdad = true;
            this.edad = 'Senior';
          });
        }
      },
        {
          text: 'Todos',
          handler: () => {
            this.ngZone.run(() => {
              this.edad = 'Edad';
              this.swtEdad = false;
            });
          }
        }
      ]
    });
    await actionSheet.present();
  }
  async opcionesSalud() {
    const actionSheet = await this.actSheet.create({
      header: 'Salud',
      buttons: [{
        text: 'Saludable',


        handler: () => {
          this.ngZone.run(() => {
            this.salud = 'Saludable';
            this.swtSalud = true;
          });
        }
      }, {
        text: 'Cuidados',
        handler: () => {
          this.ngZone.run(() => {
            this.salud = 'Cuidados';
            this.swtSalud = true;
          });
        }
      },
      {
        text: 'Todos',
        handler: () => {
          this.ngZone.run(() => {
            this.salud = 'Salud';
            this.swtSalud = false;
          });
        }
      }
      ]
    });
    await actionSheet.present();
  }
}
