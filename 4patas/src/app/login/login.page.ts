import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, group } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
// class="wrapper-cannot-be-position-other-than-static
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

