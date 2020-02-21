import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../animations/slidein.animations';
@Component({
  selector: 'app-reiniciar',
  templateUrl: './reiniciar.component.html',
  styleUrls: ['./reiniciar.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@routerTransition]': '' }
})
export class ReiniciarComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
