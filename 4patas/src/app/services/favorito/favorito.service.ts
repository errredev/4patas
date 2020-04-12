import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../../shared/models/mensaje';
import { FavoritO } from '../../shared/models/favorito.interace';
import { AvisoI } from 'src/app/shared/models/aviso.interace';
import { AppService } from '../app/app.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private favoritoCollection: AngularFirestoreCollection<FavoritO>;
  private avisoCollection: AngularFirestoreCollection<AvisoI>;
  public FavoritosDeUsuariO: { FavoritoId: string }
  private favoritosDeUsuarioCollection: AngularFirestoreCollection<{ FavoritoId: string }>;

  constructor(private afs: AngularFirestore, private srvApp: AppService) {
    this.favoritoCollection = this.afs.collection<FavoritO>('favoritos');
    this.avisoCollection = this.afs.collection<AvisoI>('avisos')
  }
  public  favoritosdeUsuario(id: string): Observable<any> {
    return this.afs.doc('favoritosUsuario/' + id).collection('avisos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  public async saveFavorito(avisoId: string, userId: string): Promise<Mensaje> {
    const ruta = this.avisoCollection.doc(avisoId).collection<FavoritO>('favoritos')
    const favorito: FavoritO = {
      uid: userId,
      fecha: Date().toLocaleString()
    }
    try {
      const favoritogenerado = await ruta.add(favorito);
      this.srvApp.refrescarfavorito(avisoId);
      return { exitoso: true, texto: favoritogenerado.id, objeto: favoritogenerado };
    } catch (error) {
      console.log(error);
      return { exitoso: false, texto: 'Error al grabar favorito' };
    }
  }
  public async deleteFavorito(avisoId: string, favoritoId: string): Promise<any> {
    const ruta = this.avisoCollection.doc(avisoId).collection<FavoritO>('favoritos');
    try {
      const borrado = await ruta.doc(favoritoId).delete();
      this.srvApp.refrescarfavorito(avisoId);
      return

      return
    } catch (error) {
      console.log(error)
      return error
    }
  }
  public async comprobarFavorito(avisoId: string, userId: string) {
    let ref = this.avisoCollection.doc(avisoId).collection<FavoritO>('favoritos').ref.where("uid", "==", userId).limit(1);
    try {
      const resultado = await ref.get()
      if (!resultado.empty) {
        return { exitoso: true, texto: resultado.docs[0].id };
      } else {
        return { exitoso: false, texto: 'vacio' };
      }
    } catch (error) {
      console.log(error)
      return { exitoso: false, texto: 'Error en Consulta de favoritos', objeto: error };
    }
  }
}