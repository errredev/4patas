import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app/app.service';
@Component({
  selector: 'app-r-loading',
  templateUrl: './r-loading.component.html',
  styleUrls: ['./r-loading.component.scss'],
})
export class RLoadingComponent implements OnInit {
  @Input() mensaje: string;
  constructor(public svcloading: AppService) { }

  ngOnInit() {

  }

}
