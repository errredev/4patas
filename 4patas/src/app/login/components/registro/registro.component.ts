import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../animations/slidein.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/models/user';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app/app.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@routerTransition]': '' }
})
export class RegistroComponent implements OnInit {

  private loading;
  constructor(private formBuilder: FormBuilder,
              public srvAuth: AuthService,
              public alrControl: AlertController,
              public router: Router,
              public toastController: ToastController,
              public svcloading: AppService) {
    this.rForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  rForm: FormGroup;
  public user: User = new User();
  ngOnInit() {
  }
  async onSignUp() {
    this.svcloading.activarloading('Registrando');
    this.user.email = this.rForm.value.email;
    this.user.password = this.rForm.value.pwd;
    const user = await this.srvAuth.onRegister(this.user);
    console.log(user);
    if (user) {
      const userAct = new User();
      userAct.email = user.user.email;
      userAct.displayName = 'Anonimo';
      userAct.uid = user.user.uid;
      userAct.photoURL = 'assets/images/avatar.png';
      // userAct.phoneNumber = 1;
      this.srvAuth.saveUserProfile(userAct);
      this.presentToast();
      this.svcloading.desactivarloading();
      this.router.navigateByUrl('/');
    } else {
      const alert = await this.alrControl.create({
        header: 'Alerta',
        subHeader: 'Operacion fallida',
        message: this.srvAuth.errMensaje,
        buttons: ['OK'],
        cssClass: 'alertCustomCss' //
      });
      this.svcloading.desactivarloading();
      await alert.present();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registro de usuario exitoso',
      color: 'warning',
      duration: 2000
    });
    toast.present();
  }
}

