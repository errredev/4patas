import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {SalaChatI} from '../../shared/models/salachat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private saladechatCollection: AngularFirestoreCollection<SalaChatI>;
  model: SalaChatI;
  constructor(private afs: AngularFirestore) {
    this.saladechatCollection = this.afs.collection<SalaChatI>('salachat');
  }

  public grabarChat(chat: SalaChatI) {
    this.model = {
      useid: 'string',
      mensaje: '123456'
    };
    console.log (chat);
    console.log(this.saladechatCollection);
    this.saladechatCollection.add(this.model);
  }
}
