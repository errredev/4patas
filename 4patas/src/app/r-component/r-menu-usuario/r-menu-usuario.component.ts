import { Component, OnInit, NgZone } from '@angular/core';
import { SideMenuOption } from './models/side-menu-option';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Accordion } from '../../animations/accordion.animations';
import { escalonado} from '../../animations/escalonado.animation';
import { AppService } from '../../services/app/app.service';
@Component({
  selector: 'app-r-menu-usuario',
  templateUrl: './r-menu-usuario.component.html',
  styleUrls: ['./r-menu-usuario.component.scss'],
  animations: [Accordion, escalonado ]

})
export class RMenuUsuarioComponent implements OnInit {
  public user: firebase.User;
  public ultimoIndice: number;
  public lista: any;
  public prelista: any;
  public currentState: string;
  public verhijos: boolean;

  constructor(public authSrv: AuthService,
              public alrControl: AlertController,
              private router: Router,
              private menu: MenuController,
              private ngZone: NgZone,
              public svcloading: AppService
  ) {
    this.ultimoIndice = 0;
    this.lista = new Array<SideMenuOption>();
    this.prelista = [
      {
        iconName2: 'person', iconName: 'person-outline',
        displayText: 'Editar', bajar: false, subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [
        ]
      },
      {
        iconName2: 'flag', iconName: 'flag-outline', displayText: 'Seguimiento',
        bajar: false, subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [
        ]
      },
      {
        iconName2: 'heart', iconName: 'heart-outline', displayText: 'Favoritos', bajar: false,
        subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [

        ]
      },
      {
        iconName2: 'bulb', iconName: 'bulb-outline', displayText: 'Modo Pantalla',
        bajar: false, subir: false, expanded: false, hasChild: true,
        iconFinal2: 'chevron-down', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [
          {
            iconName2: 'sunny-outline', iconName: 'sunny', iconFinal: 'checkmark-circle',
            displayText: 'Claro', url: '/home', check: false
          },
          {
            iconName2: 'moon-outline', iconName: 'moon', iconFinal: 'checkmark-circle',
            displayText: 'Oscuro', url: '/home', check: false
          },
        ]
      },
      {
        iconName2: 'book', iconName: 'book-outline', displayText: 'Preguntas Frecuentes', bajar: false,
        subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [

        ]
      },
      {
        iconName2: 'exit', iconName: 'exit-outline', displayText: 'Salir', bajar: false,
        subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [

        ]
      }
    ];
  }
  // ******************** Cuando se presiona un item principal del menu *******************************
  push(index) {
    this.lista[index].activo = true;
    if (this.lista[index].hasChild) {
      this.lista[index].expanded = this.lista[index].expanded === true ? false : true;
    }

    if (this.ultimoIndice !== index) {
      this.lista[index].activo = true;
      this.lista[this.ultimoIndice].expanded = false;
      this.lista[this.ultimoIndice].activo = false;
      this.ultimoIndice = index;
    }
    this.llamaraccion(this.lista[index].displayText);
  }

  // public llenarmenu(index: number) {
  // setInterval(() => {
  //  if (index === this.prelista.length) {
  //     return;
  //   }
  //    this.lista.push(this.prelista[index]);
  //    index++;
  //  }, 600);
  // }
  // ******************** Oninit *******************************
  ngOnInit() {
    this.lista = this.prelista;
    // this.llenarmenu(0);
    this.authSrv.userData$.subscribe(user => {
      // console.log(user.email);
      if (user) {
        this.user = user;
      }
    });

  }
  // ******************** Pregunta si desea salir *******************************
  async Logout() {
    console.log('logout');
    const alert = await this.alrControl.create({
      header: 'Aviso',
      subHeader: 'Confirmacion',
      message: '¿Desea Salir de la applicacion?',
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'Ok',
          handler: () => {
            this.Salir();
          }
        }
      ],
      cssClass: 'alertCustomCss' //
    });
    await alert.present();
  }
  // ******************** Si la opcion es salir *******************************
  async Salir() {
   
    this.irpara('/login');
    this.authSrv.logout();
    // this.svcloading.quitarrmenu();
    // this.router.navigate(['/login']);
  }
  // ******************** *******************************
  llamaraccion(accion: string) {
    console.log(accion);
    switch (accion) {
      case 'Salir': {
        this.Logout();
        break;
      }
      case 'Editar': {
        this.irpara('tabnav/profile');
        break;
      }
    }
  }
  // ******************** *******************************
  irpara(donde) {
    this.menu.enable(true, 'star');
    this.menu.close('start');
    this.ngZone.run(() => this.navigateTo(donde));
  }
  // ******************** *******************************
  navigateTo(url) {
    this.router.navigate([url]);

  }

  // ******************** *******************************

  subpush(y, x) {
    switch (this.lista[y].subOptions[x].displayText) {
      case 'Claro': {
        console.log('Modo Claro');
        this.lista[y].subOptions[1].check = false;
        this.lista[y].subOptions[x].check = true;
        document.body.classList.toggle('dark', true);
        break;
      }
      // tslint:disable-next-line:no-switch-case-fall-through
      case 'Oscuro': {
        console.log('Modo Oscuro');
        this.lista[y].subOptions[0].check = false;
        this.lista[y].subOptions[x].check = true;
        document.body.classList.toggle('dark');
        break;
      }
    }
  }
}
