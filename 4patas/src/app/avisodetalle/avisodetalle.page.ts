import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisoI } from '../shared/models/aviso.interace'
import { Observable } from 'rxjs';
import { AvisoService } from '../services/aviso.service';
import {AppService} from '../services/app/app.service';
import {fotoSlide} from '../animations/fotoslide.animations';
@Component({
  selector: 'app-avisodetalle',
  templateUrl: './avisodetalle.page.html',
  styleUrls: ['./avisodetalle.page.scss'],
  animations: [fotoSlide]
})
export class AvisodetallePage implements OnInit {
  private avisoId: string;
  private ultimoIndice: number =0;
  public imagenpreload: Array<any>;
  public largocaja='';
  public topbotones = '';
  public src: string = "http://example.com/yourInitialImage.png";
  public fotos : Array<{imagen:string,activa:boolean,numero:number, color:string, estado:string}>
  public aviso$: Observable<AvisoI>;
  constructor(private route: ActivatedRoute, private srvAviso: AvisoService, private srvApp: AppService) {
    this.largocaja = (srvApp.ancho - (srvApp.ancho / 4))+'px'
    this.topbotones = ((srvApp.ancho - (srvApp.ancho / 4))/2) + 'px'
    this.avisoId = route.snapshot.paramMap.get('id')
    this.aviso$ = srvAviso.traeraviso(this.avisoId)
  }
  
  ngOnInit() {
    this.imagenpreload = []
    this.fotos = [];
    let indice = 1;
    this.aviso$.subscribe(aviso => {
      for (let i = 0; i < aviso.fotos.length; i++) {
        let imagen = new Image();
        imagen.src = aviso.fotos[i];
        this.imagenpreload.push(imagen);
        this.fotos.push({ imagen: aviso.fotos[i], activa: false, numero: indice, color: 'secondary',estado : 'inactive'});
      indice++;
      }
      this.fotos[0].color = 'primary';
      this.fotos[0].activa=true;
      this.fotos[0].estado = 'active';
   });
    console.log(this.fotos);
  }
  public activarFoto (indice:number, lastindice?:number){
    lastindice = (lastindice ? lastindice : this.ultimoIndice);
    if (indice !== lastindice) {
      this.fotos[indice].color = 'primary';
      this.fotos[indice].activa = true;
      this.fotos[indice].estado = 'active';
      this.fotos[lastindice].color = 'secondary';
      this.fotos[lastindice].activa = false;
      this.fotos[lastindice].estado = 'inactive';
      this.ultimoIndice = indice;
    }
  }
  public pasarFoto(direccion:string, indice:number){
    this.fotos[indice].estado = 'activa';
    let newindice:number;
    let largo = this.fotos.length
    if (direccion === 'back') {
      if (indice>0) {
        newindice= indice- 1;
      } else {
        newindice = largo-1;
      }
    } else {
      newindice = indice +1;
      console.log (newindice)
      if (newindice === largo) {
        newindice = 0;
      }
    }
    this.activarFoto(newindice,indice)
  }

}
