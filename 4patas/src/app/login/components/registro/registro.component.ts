import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../animations/slidein.animations';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@routerTransition]': '' }
})
export class RegistroComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
