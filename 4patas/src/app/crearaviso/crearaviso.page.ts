import { Component, OnInit } from '@angular/core';
import { Regiones } from './regiones';
import { AvisoI } from '../shared/models/aviso.interace';
import { FileI } from '../shared/models/file.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvisoService } from '../services/aviso.service';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme/theme.service';
import { Router } from '@angular/router';
import {CroppService} from '../services/cropp/cropp.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crearaviso',
  templateUrl: './crearaviso.page.html',
  styleUrls: ['./crearaviso.page.scss'],
})
export class CrearavisoPage implements OnInit {
  public imagenes = [{ imagen: null, activo: true, cargada: false },
                      { imagen: null, activo: false, cargada: false },
                      { imagen: null, activo: false, cargada: false },
                      { imagen: null, activo: false, cargada: false }];
  public colorng = this.themesrv.primary;
  public cropvisible = false;
  public indice = 0;
  public image: FileI;
  public currentImage = '';
  public regiones: any;
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
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.cropvisible = true;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  tomarcropp() {
    this.cropvisible = false;
    this.imagenes[this.indice].imagen = this.croppedImage;
    this.imagenes[this.indice].cargada = true;
    this.imagenes[this.indice].activo = false;
    if (this.indice < 2) {
      this.indice ++;
      this.imagenes[this.indice].activo = true;
    }
  
  }
  constructor(private avisoS: AvisoService,
              private authsrv: AuthService,
              public themesrv: ThemeService,
              public router: Router,
              public croppsrv: CroppService) {
    this.regiones = Regiones;
    const user = this.authsrv.datosuser();
    this.uid = user.uid;
  }

  ngOnInit() {
  }

  onChange(event) {
    const resultado = this.regiones.find(region => region.region === event.detail.value);
    console.log(resultado);
    this.comunas = resultado.comunas;
    // this.comunas = JSON.parse(resultado.comunas);
    this.avisoForm.controls.comuna.setValue('foo');
    console.log(this.comunas);
  }
  // Image Preview
  showPreview(e) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
          this.imagenes[0].imagen = event.target.result;
          this.imagenes[0].cargada = true;
          this.imagenes[0].activo = false;
          this.imagenes[1].activo = true;
          this.image = e.target.files[0];
      };
    }
  }
  onSaveAaviso(aviso: AvisoI): void {
    this.avisoS.saveAviso(aviso, this.uid);

  }
  prueba() {
    const user = this.authsrv.datosuser();
    console.log(user.uid);
  }
  croppimagen() {

     this.router.navigate(['cropp']);
  }
}
