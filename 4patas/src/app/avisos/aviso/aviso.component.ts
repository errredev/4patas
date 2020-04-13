import { Component, OnInit, Input } from '@angular/core';
import { AvisoService } from '../../services/aviso.service';
import { FavoritoService } from '../../services/favorito/favorito.service';
import { AppService} from '../../services/app/app.service';
import { Mensaje } from 'src/app/shared/models/mensaje';
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
})
export class AvisoComponent implements OnInit {
  @Input() aviso: any;
  @Input() user: string;
  public activoFavorito:boolean=false;
  public pushBotonFavoritos: boolean = false;
  
  
  constructor(private srvAviso: AvisoService, private srvFavorito: FavoritoService, private srvApp:AppService) {
  
    
  }

  async ngOnInit() {
    this.srvApp.refreshFavorito$.subscribe ((idAvisos: string) => {
      console.log('escuche el llamado ' + this.aviso.id + ' = '+ idAvisos )
      if (this.aviso.id === idAvisos) {
        this.comprobarFavorito()
        
      }
    })
    this.comprobarFavorito()
  }
  public async comprobarFavorito(){
    const mensajeFavorito = await this.srvFavorito.comprobarFavorito(this.aviso.id, this.user)
    if (mensajeFavorito.exitoso) {
      this.activoFavorito = true;
    } else {
      // this.activoFavorito = true;
      this.activoFavorito = false;
    }
  }

  public async pushfavorito() {
  if (!this.pushBotonFavoritos) {
    this.pushBotonFavoritos = true;
    if (!this.activoFavorito) {
      this.activoFavorito = true;
      const mensajeFavorito: Mensaje = await this.srvFavorito.saveFavorito(this.aviso.id, this.user, this.aviso.detalle.fecha, this.aviso.detalle.nombre, this.aviso.detalle.fotos[0]);
      if (!mensajeFavorito.exitoso) {
        this.activoFavorito = false;
      }
    } else {
      this.activoFavorito = false;
      const mensajeFavorito = await this.srvFavorito.deleteFavorito(this.aviso.id, this.user);
      if (!mensajeFavorito.exitoso) {
        this.activoFavorito = true;
      }
    }
    this.pushBotonFavoritos = false;
  }
}
}
