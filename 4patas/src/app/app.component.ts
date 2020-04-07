import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService} from './services/app/app.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public svcApp: AppService
  ) {
    this.svcApp.desactivarloading();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.svcApp.largo = this.platform.height()
      this.svcApp.ancho = this.platform.width()
      console.log(this.platform.platforms)
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];

  }
}
