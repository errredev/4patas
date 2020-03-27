import { Component, OnInit } from '@angular/core';
import { Regiones } from './regiones';
import { AvisoI } from '../shared/models/aviso.interace';
import { FileI } from '../shared/models/file.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvisoService } from '../services/aviso.service';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme/theme.service';
import { Router } from '@angular/router';
import { AppService } from '../services/app/app.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AlertController} from '@ionic/angular';


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
    especie: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });
  imageChangedEvent: any = '';
  croppedImage: any = '';

  async fileChangeEvent(event: any): Promise<void> {
    if (this.indice !== 4) {
    this.cropvisible = true;
    this.imageChangedEvent = event;
    } else {
      const alert = await this.alrControl.create({
        header: 'Información',
        subHeader: 'No se aceptan mas fotos',
        message: 'Alcanzo el numero maximo posible',
        buttons: ['OK'],
        cssClass: 'alertCustomCss' //
      });
      await alert.present();
    }
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
  async tomarcropp() {
    this.cropvisible = false;
    this.imagenes[this.indice].imagen = this.croppedImage;
    this.imagenes[this.indice].cargada = true;
    this.imagenes[this.indice].activo = false;
    this.indice ++;
    if (this.indice < 3) {
      this.imagenes[this.indice].activo = true;
    }
  }
  constructor(private avisoS: AvisoService,
              private authsrv: AuthService,
              public themesrv: ThemeService,
              public router: Router,
              public appsrv: AppService,
              public alrControl: AlertController) {
    this.regiones = Regiones;
    const user = this.authsrv.datosuser();
    this.uid = user.uid;
  }

  ngOnInit() {
  }

  onChange(event) {
    const resultado = this.regiones.find(region => region.region === event.detail.value);
    this.comunas = resultado.comunas;
    this.avisoForm.controls.comuna.setValue('foo');
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
  async onSaveAaviso(aviso: AvisoI): Promise<void> {
    if (this.indice > 0) {
      this.appsrv.activarloading ('Guardando Aviso');
      const respuesta = await this.avisoS.crearAviso(aviso, this.uid, this.imagenes);
      if (respuesta.exitoso) {
        this.limpiar();
        const alert = await this.alrControl.create({
          header: 'Exitoso',
          subHeader: 'Operacion Realizada',
          message: 'Su aviso fue grabada!',
          buttons: ['OK'],
          cssClass: 'alertCustomCss' //
        });
        await alert.present();
      } else {
        const alert = await this.alrControl.create({
          header: 'Informaciòn',
          subHeader: 'Error en la operación',
          message: respuesta.texto,
          buttons: ['OK'],
          cssClass: 'alertCustomCss' //
        });
        await alert.present();
      }
      this.appsrv.desactivarloading();
    } else {
      const alert = await this.alrControl.create({
        header: 'Información',
        subHeader: 'No se puede grabar',
        message: 'Falta a lo menos 1 imagen',
        buttons: ['OK'],
        cssClass: 'alertCustomCss' //
      });
      await alert.present();
    }
  }
  prueba() {
    const user = this.authsrv.datosuser();
    console.log(user.uid);
  }
  limpiar() {
    this.avisoForm.reset();
    this.imagenes.forEach(function(value) {
      value.imagen = '';
      value.activo = false;
      value.cargada = false;
    });

  }
  croppimagen() {
     this.router.navigate(['cropp']);
  }
}
