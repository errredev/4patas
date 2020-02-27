import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public entrar: boolean;
  constructor() { }

  ngOnInit() {
  }
  prepareRoute() {
    if (this.entrar) {
      this.entrar = false;
    } else {
      this.entrar = true;
    }
    return this.entrar;
}
}

