import { Component, OnInit, NgZone } from '@angular/core';
import { MenuController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { escalonado } from '../animations/escalonado.animation';
import {Panelperrogato} from '../animations/panelperrogato.animations';
import {AvisoService} from '../services/aviso.service';
import { AvisoComponent } from '../avisos/aviso/aviso.component';
import { AvisoI } from '../shared/models/aviso.interace';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [escalonado, Panelperrogato],
})
export class HomePage implements OnInit {
  public size = 'Tamaño';
  public sexo = 'Sexo';
  public edad = 'Edad';
  public swtPerroGato = 'inicial';
  public swtFlechaPerroGato = 'inicial';
  
  public avisos: AvisoI;
  
  public user: firebase.User;
  constructor(private menu: MenuController,
              public authSrv: AuthService,
              private actSheet: ActionSheetController,
              private ngZone: NgZone,
              private avisoSrv: AvisoService
              ) { }

  ngOnInit() {
    this.authSrv.userData$.subscribe(async user => {
      // console.log(user.email);
      this.user = user;
      this.llamarAvisos ()
    });
  }
  async llamarAvisos() {
    let mensaje = await this.avisoSrv.traerAvisos(this.size,this.sexo,this.edad);
    if (mensaje.exitoso) {
      this.avisos = mensaje.objeto;
    } else {

    }
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
          this.gatillarAccion('Tamaño', 'Pequeño');
        }
      }, {
        text: 'Mediano',
        handler: () => {
          this.gatillarAccion('Tamaño', 'Mediano');
        }
      }, {
        text: 'Grande',
        handler: () => {
          this.gatillarAccion('Tamaño', 'Grande');
        }
      },
        {
          text: 'Todos',
          handler: () => {
            this.gatillarAccion('Tamaño', 'Tamaño');
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
          this.gatillarAccion('Sexo', 'Hembra');
        }
      }, {
        text: 'Macho',
        handler: () => {
          this.gatillarAccion('Sexo', 'Macho');
        }
      },
        {
          text: 'Todos',
          handler: () => {
            this.gatillarAccion('Sexo', 'Sexo');
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
          this.gatillarAccion('Edad', 'Cachorro');
        }
      }, {
        text: 'Juvenil',
        handler: () => {
          this.gatillarAccion('Edad', 'Juvenil');
        }
      },
      {
        text: 'Adulto',
        handler: () => {
          this.gatillarAccion('Edad', 'Adulto');
        }
      },
        {
          text: 'Senior',
          handler: () => {
            this.gatillarAccion('Edad', 'Senior');
          }
        },
        {
          text: 'Todos',
          handler: () => {
            this.gatillarAccion('Edad', 'Edad');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  private gatillarAccion (tipo:string, valor:string) {
    if (tipo==='Tamaño') {
      this.ngZone.run(() => {
        this.size = valor;
      });
    }
    if (tipo === 'Sexo') {
      this.ngZone.run(() => {
        this.sexo = valor;
      });
    }
    if (tipo === 'Edad') {
      this.ngZone.run(() => {
        this.edad = valor;
      });
    }
    this.llamarAvisos();
  }
  async doRefresh(event) {
    let mensaje = await this.avisoSrv.traerAvisos(this.size, this.sexo, this.edad);
    if (mensaje.exitoso) {

      this.avisos = mensaje.objeto;
      event.target.complete();
    } else {

    }
    
  }
  public pushPerroGato() {
    this.swtFlechaPerroGato = (this.swtFlechaPerroGato === 'inicial' ? 'activo' : 'inicial');
    this.swtPerroGato = (this.swtPerroGato === 'inicial' ? 'activo' : 'inicial');
    }
  }
