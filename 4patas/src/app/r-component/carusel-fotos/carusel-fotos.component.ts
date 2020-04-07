import { Component, OnInit } from '@angular/core';
import { fotoSlide } from '../../animations/fotoslide.animations';
@Component({
  selector: 'carusel-fotos',
  templateUrl: './carusel-fotos.component.html',
  styleUrls: ['./carusel-fotos.component.scss'],
  animations: [fotoSlide]
})
export class CaruselFotosComponent implements OnInit {
  public estado1 = 'inactive';
  constructor() { }

  ngOnInit() {}

}
