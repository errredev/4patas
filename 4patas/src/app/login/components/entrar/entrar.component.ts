import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../animations/slidein.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/models/user';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app/app.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.scss'],
  animations: [routerTransition()],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@routerTransition]': '' }
})
export class EntrarComponent implements OnInit {
  private loading;
  constructor(private formBuilder: FormBuilder,
              public srvAuth: AuthService,
              public alrControl: AlertController,
              public router: Router,
              public loadingCtrl: LoadingController,
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
  async onLogin() {
    this.svcloading.activarloading ('accesando');
    this.user.email = this.rForm.value.email;
    this.user.password = this.rForm.value.pwd;
    const user = await this.srvAuth.onLogin(this.user);
    if (user) {
      this.svcloading.desactivarloading();
      this.router.navigateByUrl('/');
    } else {
      const alert = await this.alrControl.create({
        header: 'Alerta',
        subHeader: 'Operacion fallida',
        message: this.srvAuth.errMensaje,
        buttons: ['OK']
      });
      this.svcloading.desactivarloading();
      await alert.present();
    }
  }
}

