import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AvisoService } from '../services/aviso.service';
import { AppService } from '../services/app/app.service';
import { FavoritoService} from '../services/favorito/favorito.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  public user: string;
  
  public favorito$ = new Observable<any>()

  public FavoritosDeUsuariO: Array<{ avisoId: string, nombre: string, fecha: string, imagen: string, especie: string }>
  constructor(public authSrv: AuthService, private srvAviso: AvisoService,
    public srvApp: AppService, private srvFavorito:FavoritoService) { 
    this.authSrv.userData$.subscribe(async user => {
      this.user = user.uid;
      console.log(this.user)
      this.favorito$ = this.srvFavorito.favoritosdeUsuario(this.user);
      
    });
  }

  ngOnInit() {
    this.srvFavorito.favoritosdeUsuario(this.user).subscribe(valor => {
      console.log(valor)
    });
    
  }
  public push() {
    console.log(this.favorito$)
  }
}
