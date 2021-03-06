import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvisoI } from '../shared/models/aviso.interace'
import { Observable } from 'rxjs';
import { AvisoService } from '../services/aviso.service';
import { FavoritoService } from '../services/favorito/favorito.service'
import { AppService } from '../services/app/app.service';
import { fotoSlide } from '../animations/fotoslide.animations';
import { Mensaje } from '../shared/models/mensaje';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-avisodetalle',
  templateUrl: './avisodetalle.page.html',
  styleUrls: ['./avisodetalle.page.scss'],
  animations: [fotoSlide]
}) 
export class AvisodetallePage implements OnInit {
  private avisoId: string;
  private ultimoIndice: number = 0;
  public largocaja: string;
  public uId: string;
  public activoFavorito: boolean = false;
  public topbotones: string;
  public pushBotonFavoritos: boolean = false;
  public fotos: Array<{ imagen: string, activa: boolean, numero: number, color: string, estado: string, }>
  public aviso$: Observable<AvisoI>;
  public aviso: AvisoI;
  constructor(private srvauth: AuthService, private route: ActivatedRoute, private srvApp: AppService, private srvAviso: AvisoService, private srvFavorito: FavoritoService) {
    this.largocaja = (srvApp.ancho - (srvApp.ancho / 4)) + 'px'
    this.topbotones = ((srvApp.ancho - (srvApp.ancho / 4)) / 2) + 'px'
    this.avisoId = route.snapshot.paramMap.get('id')
    this.srvauth.userData$.subscribe(async user => {
      this.uId = user.uid;
    });
    this.aviso$ = srvAviso.traeraviso(this.avisoId)
  }

  ngOnInit() {

    this.fotos = [];
    let indice = 1;
    this.aviso$.subscribe(async aviso => {
      this.aviso= aviso;
      if (this.fotos.length === 0) {
        for (let i = 0; i < aviso.fotos.length; i++) {
          let imagen = new Image();
          this.fotos.push({ imagen: aviso.fotos[i], activa: false, numero: indice, color: 'secondary', estado: 'inactive' });
          indice++;
        }
        this.fotos[0].color = 'primary';
        this.fotos[0].activa = true;
        this.fotos[0].estado = 'active';
        const mensajeFavorito = await this.srvFavorito.comprobarFavorito(this.avisoId, this.uId)
        if (mensajeFavorito.exitoso) {
          this.activoFavorito = true;
        } else {
          this.activoFavorito = false;
        }
      }
    });

  }
  public activarFoto(indice: number, lastindice?: number) {
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
  public pasarFoto(direccion: string, indice: number) {
    this.fotos[indice].estado = 'activa';
    let newindice: number;
    let largo = this.fotos.length
    if (direccion === 'back') {
      if (indice > 0) {
        newindice = indice - 1;
      } else {
        newindice = largo - 1;
      }
    } else {
      newindice = indice + 1;
      if (newindice === largo) {
        newindice = 0;
      }
    }
    this.activarFoto(newindice, indice)
  }
  public async pushfavorito() {

    if (!this.pushBotonFavoritos) {
      this.pushBotonFavoritos=true;
      if (!this.activoFavorito) {
        this.activoFavorito = true;
        const mensajeFavorito: Mensaje = await this.srvFavorito.saveFavorito(this.avisoId, this.uId, this.aviso.fecha, this.aviso.nombre, this.aviso.fotos[0] );
        if (!mensajeFavorito.exitoso) {
          this.activoFavorito = false;
        }
      } else {
        this.activoFavorito = false;
        const mensajeFavorito = await this.srvFavorito.deleteFavorito(this.avisoId, this.uId);
        if (!mensajeFavorito.exitoso) {
          this.activoFavorito = true;
        }
      }
      this.pushBotonFavoritos = false;
    }
  }
}
