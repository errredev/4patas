import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../../shared/models/mensaje';
import { Observable } from 'rxjs';
import { FavoritO } from '../../shared/models/favorito.interace';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private favoritoCollection: AngularFirestoreCollection<FavoritO>;
  constructor(private afs: AngularFirestore) { 
     this.favoritoCollection = this.afs.collection<FavoritO>('favoritos');
  }

  public async saveFavorito(avisoId: string, userId: string, emisorId: string): Promise<Mensaje> {
    const favoritoDoc = this.afs.collection<FavoritO>('favoritos').doc(avisoId)
    console.log (avisoId,userId,emisorId)
    const favorito: FavoritO = {
      uid: userId,
      avisoid: avisoId,
      emisorid: emisorId,
      fecha: Date().toLocaleString()
    }
    try {
      const favoritogenerado = await this.favoritoCollection.add(favorito);
      return { exitoso: true, texto: favoritogenerado.id, objeto: favoritogenerado };
    } catch (error) {
      console.log(error);
      return { exitoso: false, texto: 'Error al grabar favorito' };
    }
  }
  public deleteFavirito(avisoId: string): any{
    return this.favoritoCollection.doc(avisoId).delete();
  }
  public async comprobarFavorito(avisoId: string, userId: string) {
    let ref = this.favoritoCollection.ref.where("avisoid", "==", avisoId).where("uid", "==", userId).limit(1);
    try {
      const resultado = await ref.get()
      console.log (resultado); 
      if (!resultado.empty) {
        return { exitoso: true, texto: resultado.docs[0].id };
      } else {
        return { exitoso: false, texto: 'vacio' };
      }
    } catch (error) {
      console.log (error)
      return { exitoso: false, texto: 'Error en Consulta de favoritos', objeto: error };
    }
  }
}