import { Injectable, EventEmitter } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AvisoI } from '../shared/models/aviso.interace';
import { Mensaje} from '../shared/models/mensaje';
import { AngularFireStorage } from '@angular/fire/storage';
import {Imagen} from '../shared/models/imagen';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private avisoCollection: AngularFirestoreCollection<AvisoI>;
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.avisoCollection = this.afs.collection<AvisoI>('avisos');
  }
  public traeraviso(id: string): Observable<AvisoI> {
    return this.afs.doc<AvisoI>('avisos/' + id).valueChanges();
  }
  public async traerAvisos(size?: string, sexo?:string, edad?:string, perro?:boolean, gato?:boolean): Promise<Mensaje>{
    let ref = this.avisoCollection.ref.where("estatus", "==", "Activo");
    let avisos = [];
    ref = (size !== 'Tamaño' ? ref.where("size", "==", size) : ref);
    ref = (sexo !== 'Sexo' ? ref.where("sexo", "==", sexo) : ref);
    ref = (edad !== 'Edad' ? ref.where("edad", "==", edad) : ref);
    if (perro && gato) {
      // nada
    } else {
      console.log ('perrogato')
      ref = (perro ? ref.where("especie", "==", 'Perro') : ref);
      ref = (gato ? ref.where("especie", "==", 'Gato') : ref);
    }
    try {
      const resultado = await ref.get()
      resultado.forEach(function (doc) {
        avisos.push({ id: doc.id, detalle: doc.data()})
      });
      return { exitoso: true, objeto:avisos };
    } catch (error) {
        return { exitoso: false, texto: 'Error en Consulta de Base de datos', objeto: error };
    }
  }
  public async crearAviso(aviso: AvisoI, Userid: string, imagenes: Imagen[]): Promise <Mensaje>  {
    aviso.fotos = [];
    for (let i = 0; i < imagenes.length; i++) {
      if (imagenes[i].cargada) {
        const nombreArchivo =  aviso.nombre + i + '.png';
        const nombreDirectorio = Userid + '/';
        const imagensubida = await this.uploadImage(nombreArchivo, nombreDirectorio, imagenes[i].imagen);
        if (imagensubida.exitoso) {
          aviso.fotos.push(imagensubida.texto);
        } else {
          return imagensubida;
        }
      }
    }
    return this.saveAviso(aviso, Userid);
  }

  public async saveAviso(aviso: AvisoI, Userid: string): Promise<Mensaje>  {
      aviso.cantidadfotos = aviso.fotos.length,
      aviso.estatus= 'Activo',
      aviso.favoritos= 0,
      aviso.mensajes= 0,
      aviso.fecha =Date().toLocaleString()
  
    try {
      const avisogenerado = await this.avisoCollection.add(aviso);
      return { exitoso: true, objeto:avisogenerado};
    } catch (error) {
      console.log(error);
      return { exitoso: false, texto: 'Error al grabar el aviso' };
    }
  }
  public incrementarFavoritos (id:string, incremento:number){
    let Ref = this.avisoCollection.doc(id);
    Ref.update({"favoritos" : firebase.firestore.FieldValue.increment(incremento)});
  }

  public async uploadImage(nombreArchivo: string, nombreDirectorio: string, base64: any): Promise <Mensaje> {
    try {
      const task = await this.storage.ref(nombreDirectorio).child(nombreArchivo).putString(base64, 'data_url');
      const reff =  this.storage.ref(task.metadata.fullPath);
      const urlImage = await reff.getDownloadURL().toPromise();
      return { exitoso: true, texto: urlImage};
    } catch (error) {
      return { exitoso: false, texto: 'Error en carga de imagen', objeto: error };
    }
  }
}
