import { Component, OnInit, NgZone } from '@angular/core';
import {SideMenuOption} from './models/side-menu-option';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AlertController, MenuController  } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ThemeService} from '../../services/theme/theme.service';
@Component({
  selector: 'app-r-menu-usuario',
  templateUrl: './r-menu-usuario.component.html',
  styleUrls: ['./r-menu-usuario.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.2s ease-out',
              style({ height: 100, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 100, opacity: 1 }),
            animate('0.2s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger('changeDivSize', [
      state(
        'initial',
        style({
          width: '100%',
          height: '0%'
        })
      ),
      state(
        'final',
        style({
          width: '100%',
          height: '100px'
        })
      ),
      transition('initial=>final', animate('200ms')),
      transition('final=>initial', animate('200ms'))
    ]),
    trigger('changevisible', [
      state(
        'initial',
        style({
          opacity: 0
        })
      ),
      state(
        'final',
        style({
          opacity: 1
        })
      ),
      transition('initial=>final', animate('200ms')),
      transition('final=>initial', animate('200ms'))
    ])

  ]
})
export class RMenuUsuarioComponent implements OnInit {
  optionHeight = 45;
  paddingLeft = 16;
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
              private themeSrv: ThemeService) {
    this.ultimoIndice = 0;
    this.lista = new Array<SideMenuOption> ();
    this.prelista = [
        {
        iconName2: 'person', iconName: 'person-outline',
        displayText: 'Editar', bajar : false, subir : false , expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false , subOptions: [
        ]
      },
      {
        iconName2: 'flag', iconName: 'flag-outline', displayText: 'Seguimiento',
        bajar: false, subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false , subOptions: [
        ]
      },
        {
          iconName2: 'heart', iconName: 'heart-outline', displayText: 'Favoritos', bajar: false,
          subir: false, expanded: false, hasChild: false,
          iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false , subOptions: [

          ]
      },
      {
        iconName2: 'eye', iconName: 'eye-outline', displayText: 'Filtro de visualización',
        bajar: false, subir: false, expanded: false, hasChild: true,
        iconFinal2: 'chevron-down', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [
          {
            iconName2: 'sunny-outline', iconName: 'sunny', iconFinal: 'checkmark-circle',
          displayText: 'Gato', url: '/home', check: false },
          {
            iconName2: 'moon-outline', iconName: 'moon', iconFinal: 'checkmark-circle',
            displayText: 'Perro', url: '/home', check: false },
        ]
      },
      {
        iconName2: 'bulb', iconName: 'bulb-outline', displayText: 'Modo Pantalla',
        bajar: false, subir: false, expanded: false, hasChild: true,
        iconFinal2: 'chevron-down', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [
          { iconName2: 'sunny-outline', iconName: 'sunny', iconFinal: 'checkmark-circle',
          displayText: 'Claro', url: '/home', check: false },
          {
            iconName2: 'moon-outline', iconName: 'moon', iconFinal: 'checkmark-circle',
            displayText: 'Oscuro', url: '/home', check: false},
        ]
      },
      {
        iconName2: 'film', iconName: 'film-outline', displayText: 'Historial', bajar: false,
        subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [

        ]
      },
      {
        iconName2: 'book', iconName: 'book-outline', displayText: 'Preguntas Frecuentes', bajar: false,
        subir: false, expanded: false, hasChild: false,
        iconFinal2: '', iconFinal: 'radio-button-on-outline', activo: false, subOptions: [

        ]
      },
      {
        iconName2: 'thumbs-down', iconName: 'thumbs-down-outline', displayText: 'Denunciar', bajar: false,
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
  this.lista[index].activo = true ;
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
    this.currentState = 'initial';
    this.lista = this.prelista;
   // this.llenarmenu(0);

  }
  // ******************** Pregunta si desea salir *******************************
  async Logout() {
    console.log ('logout');
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
      ]
    });
    await alert.present();
}
// ******************** Si la opcion es salir *******************************
  async Salir() {
    await this.authSrv.logout();
    this.irpara('/login');
   // this.router.navigate(['/login']);
  }
  // ******************** *******************************
 llamaraccion(accion: string) {
   console.log (accion);
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
        document.body.classList.toggle('dark' );
        break;
      }
    }
  }
}
