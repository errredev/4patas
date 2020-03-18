import { Component, OnInit } from '@angular/core';
import {Regiones} from './regiones';
import {AvisoI} from '../shared/models/aviso.interace';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvisoService } from '../services/aviso.service';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-crearaviso',
  templateUrl: './crearaviso.page.html',
  styleUrls: ['./crearaviso.page.scss'],
})
export class CrearavisoPage implements OnInit {
  public regiones: any ;
  public uid: string;
  public comunas: string;
  public avisoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    salud: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    comuna: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });
  constructor(private avisoS: AvisoService, private authsrv: AuthService) {
    this.regiones = Regiones;
    const user = this.authsrv.datosuser();
    this.uid = user.uid;
  }

  ngOnInit() {
  }

  onChange(event) {
    const resultado = this.regiones.find(region => region.region === event.detail.value);
    console.log (resultado);
    this.comunas = resultado.comunas;
    // this.comunas = JSON.parse(resultado.comunas);
    this.avisoForm.controls.comuna.setValue('foo');
    console.log(this.comunas );

}
  onSaveAaviso(aviso: AvisoI): void {
   
    this.avisoS.saveAviso(aviso, this.uid);

  }
  prueba() {
   const user = this.authsrv.datosuser();
   console.log(user.uid);
  }
}
