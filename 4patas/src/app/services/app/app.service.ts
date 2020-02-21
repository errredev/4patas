import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  swchloading$ = new EventEmitter<boolean>();
  public mensaje: string;
  constructor() {
    this.swchloading$.emit(false);
    this.mensaje = this.mensaje;
  }
  activarloading(mensaje): void {
    this.swchloading$.emit(true);
    this.mensaje = mensaje;
  }
  desactivarloading(): void {
    this.swchloading$.emit(false);
    this.mensaje = null;

  }
}
