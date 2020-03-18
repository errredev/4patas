import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AvisoI } from '../shared/models/aviso.interace';
// import { FileI } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private avisoCollection: AngularFirestoreCollection<AvisoI>;

  constructor(private afs: AngularFirestore) {
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

  // private uploadImage(item: AvisoI, image: FileI) {
  //   this.filePath = `images/${image.name}`;
  //   const fileRef = this.storage.ref(this.filePath);
  //   const task = this.storage.upload(this.filePath, image);
  //   task.snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(urlImage => {
  //           this.downloadURL = urlImage;
  //           this.saveItem(item);
  //         });
  //       })
  //     ).subscribe();
  // }
}
