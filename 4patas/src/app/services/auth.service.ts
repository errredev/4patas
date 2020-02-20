import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/models/user';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FileI } from '../shared/models/file.interface';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isreset: boolean;
  public errMensaje = 'vacio';
  public userData$: Observable<firebase.User>;
  private filePath: string;
  swchloading$ = new EventEmitter<string>();
  constructor(public afAuth: AngularFireAuth,
              public alrControl: AlertController,
              public router: Router,
              private storage: AngularFireStorage) {
    this.userData$ = afAuth.authState;
  }
  // login
    async onLogin(user: User) {
      try {
        return await this.afAuth.auth.signInWithEmailAndPassword (
          user.email,
          user.password
          );
       } catch (error) {
      this.errMensaje = error.code;
      if (error.code === 'auth/user-not-found') {
          this.errMensaje = 'El usuario ingresado no esta registrado';
       }
      if (error.code === 'auth/wrong-password') {
          this.errMensaje = 'El password ingresado es incorrecto';
        }
      }
     }
  // registro
     async onRegister(user: User) {
       try {
         return await this.afAuth.auth.createUserWithEmailAndPassword (
           user.email,
           user.password
         );
         } catch (error) {
         this.errMensaje = error.code;
         if (error.code === 'auth/email-already-in-use') {
          this.errMensaje = 'el correo ingresado ya se encuentra registrado.';
         }
         }
     }
      async usuarioactivo() {
        const user = this.afAuth.authState;
        console.log(user);
        return user;
     }
// salir de aplicacion
  async logout() {
   await this.afAuth.auth.signOut().then(() => {
      console.log('sali');
    });
  }
  // reinicializar password
  async resetPassword(email: string) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email).then(() => this.isreset = true);
    } catch (error) {
      this.isreset = false;
      this.errMensaje = error.code;
      if (error.code === 'auth/user-not-found') {
        this.errMensaje = 'El correo ingresado no se encuentra registrado';
      }
    }
  }

  preSaveUserProfile(user: User, image?: FileI): void {
    this.swchloading$.emit('Activar');
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: User, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        })
      ).subscribe();
  }

  saveUserProfile(user: User) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    })
        .then(() => {
        this.swchloading$.emit('desactivar');
        console.log('User updated!');
        this.errMensaje = '';
      }
    )
      .catch(err => {
        this.swchloading$.emit('desactivar');
        console.log('Error', err);
        this.errMensaje = err;
    });
  }
}
