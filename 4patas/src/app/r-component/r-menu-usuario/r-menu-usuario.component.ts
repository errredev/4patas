import { Component, OnInit } from '@angular/core';
import {SideMenuOption} from './models/side-menu-option';
@Component({
  selector: 'app-r-menu-usuario',
  templateUrl: './r-menu-usuario.component.html',
  styleUrls: ['./r-menu-usuario.component.scss'],
})
export class RMenuUsuarioComponent implements OnInit {
  optionHeight = 45;
  paddingLeft = 16;
  public lista: any;
  public pageList: [
    {
      iconName: 'home', displayText: 'Home', expanded: false, hasChild: true,
      subOptions: [
      ]
    },
    {
      iconName: 'home', displayText: 'Home', expanded: false, hasChild: true,
      subOptions: [
        { iconName: 'home', displayText: 'Home', url: '/home' },
        { iconName: 'home', displayText: 'Home', url: '/home' },
        { iconName: 'home', displayText: 'Home', url: '/home' }
      ]
    }
  ];
  toggle(item) {
    item.expanded = !item.expanded;
  }
  constructor() {
      this.lista = [
      {
        iconName: 'person', displayText: 'Datos Personales', expanded: false, hasChild: true,
        subOptions: [
  
        ]
      },
      {
        iconName: 'options', displayText: 'Modo Pantalla', expanded: false, hasChild: true,
        subOptions: [
          { iconName: 'sunny', displayText: 'Claro', url: '/home' },
          { iconName: 'moon', displayText: 'Oscuro', url: '/home' },
  
        ]
      },
        {
          iconName: 'exit', displayText: 'Salir', expanded: false, hasChild: true,
          subOptions: [

          ]
        }
    ]
   }

  ngOnInit() {
    console.log (this.lista);
  }
}
