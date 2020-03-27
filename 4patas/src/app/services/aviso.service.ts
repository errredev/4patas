import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AvisoI } from '../shared/models/aviso.interace';
import { Mensaje} from '../shared/models/mensaje';
import { AngularFireStorage } from '@angular/fire/storage';
import {Imagen} from '../shared/models/imagen';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private avisoCollection: AngularFirestoreCollection<AvisoI>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.avisoCollection = afs.collection<AvisoI>('avisos');
  }

  public async crearAviso(aviso: AvisoI, Userid: string, imagenes: Imagen[]): Promise <Mensaje>  {
    aviso.fotos = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < imagenes.length; i++) {
      if (imagenes[i].cargada) {
        const nombreArchivo =  aviso.nombre + i + '.png';
        const nombreDirectorio = Userid + '/';
        console.log(nombreArchivo);
        const imagensubida = await this.uploadImage(nombreArchivo, nombreDirectorio, imagenes[i].imagen);
        console.log(imagensubida);
        if (imagensubida.exitoso) {
          console.log(imagensubida.texto);
          aviso.fotos.push(imagensubida.texto);
        } else {
          console.log(imagensubida);
          return imagensubida;
        }
      }
    }
    return this.saveAviso(aviso, Userid);
  }

  public async saveAviso(aviso: AvisoI, Userid: string): Promise<Mensaje>  {
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
      especie: aviso.especie,
      fotos: aviso.fotos,
      estatus: 'Activo',
      favoritos: 0,
      mensajes: 0,
      fecha: Date().toLocaleString()
    };
    try {
      return { exitoso: true, objeto: this.avisoCollection.add(avisoObj)};
    } catch (error) {
      return { exitoso: false, texto: 'Error al grabar el aviso' };
    }
  }

  public async uploadImage(nombreArchivo: string, nombreDirectorio: string, base64: any): Promise <Mensaje> {
    console.log ('estou dentro');
    try {
      const task = await this.storage.ref(nombreDirectorio).child(nombreArchivo).putString(base64, 'data_url');
      const reff =  this.storage.ref(task.metadata.fullPath);
      const urlImage = await reff.getDownloadURL().toPromise();
      console.log('exitoso');
      return { exitoso: true, texto: urlImage};
    } catch (error) {
      return { exitoso: false, texto: 'Error en carga de imagen', objeto: error };
    }
  }
}
