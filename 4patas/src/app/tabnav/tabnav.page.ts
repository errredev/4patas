import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AppService } from '../../app/services/app/app.service';

@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.page.html',
  styleUrls: ['./tabnav.page.scss'],
})
export class TabnavPage implements OnInit {

  constructor(public svcloading: AppService) { }

  ngOnInit() {
    this.svcloading.ponermenu();
  }

}
