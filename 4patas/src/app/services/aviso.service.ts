import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AvisoI } from '../shared/models/aviso.interace';
import {Mensaje} from '../shared/models/mensaje';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private avisoCollection: AngularFirestoreCollection<AvisoI>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.avisoCollection = afs.collection<AvisoI>('avisos');
  }

  // public getAllItems(): Observable<AvisoI[]> {
  //   return this.afs
  //     .collection('items')
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions =>
  //         // concatena el ID con el contenido
  //         actions.map(a => {
  //           const data = a.payload.doc.data() as AvisoI;
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         })
  //       )
  //     );
  // }

  // public getOneItem(id: AvisoI): Observable<AvisoI> {
  //   return this.afs.doc<AvisoI>(`items/${id}`).valueChanges();
  // }
  // public deleteItemById(item: AvisoI) {
  //   return this.itemsCollection.doc(item.id).delete();
  // }
  // new
  // public preAddAndUpdateItem(item: AvisoI, image: FileI): void {
  //   this.uploadImage(item, image);
  // }
  // public editItemById(item: AvisoI, newImage?: FileI) {
  //   if (newImage) {
  //     this.uploadImage(item, newImage);
  //   } else {
  //     return this.itemsCollection.doc(item.id).update(item);
  //   }
  // }
  public saveAviso(aviso: AvisoI, Userid: string) {
    // const id = this.afs.createId();
    // this.afs.collection('avisos').doc(id).set({
    // });

    const avisoObj = {
      nombre: aviso.nombre,
      size: aviso.size,
      sexo: aviso.sexo,
      edad: aviso.edad,
      salud: aviso.salud,
      region: aviso.region,
      comuna: aviso.comuna,
      uid: Userid,
      descripcion: aviso.descripcion,
      direccion: aviso.direccion,
      estatus: 'Activo',
      favoritos: 0,
      mensajes: 0,
      portada: 'url',
      fecha: Date().toLocaleString()
    };
    return this.avisoCollection.add(avisoObj);
  }

  public async uploadImage(nombre: string, base64: any): Promise <Mensaje> {
    try {
      const task = await this.storage.ref('avisos/').child(nombre)
        .putString(base64, 'data_url');
      const reff = await this.storage.ref(task.metadata.fullPath);
      reff.getDownloadURL().subscribe(urlImage => {
        const downloadURL = urlImage;
        console.log(downloadURL);
        return { exitoso: true, texto: downloadURL};
      });
    } catch (error) {
      return { exitoso: false, texto: 'Error en carga de imagen' };
    }
  }
}
