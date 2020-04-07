import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public primary = '#ff3e00';
  public secondary = '#d1d0cc';
  public light = '#f6f5f0';
  public dark = '#242936';
  public medium = '#ffffff';
  public contrast = '#565B56';
  public tertiary = '#FF8A65';
  public largo = 0;
  public ancho = 0;
  
  swchloading$ = new EventEmitter<boolean>();
  swtRefreshHome$ = new EventEmitter<boolean>();
  menuok$ = new EventEmitter<boolean>();
  public mensaje: string;
  constructor() {
    this.swchloading$.emit(false);
    this.mensaje = this.mensaje;
    this.menuok$.emit(false);
    this.swtRefreshHome$.emit(false);
  }
  refrescarOn(): void {
    this.swtRefreshHome$.emit(true);
  }
  refrescarOff(): void {
    this.swtRefreshHome$.emit(false);
  }
  activarloading(mensaje:string): void {
    this.swchloading$.emit(true);
    this.mensaje = mensaje;
  }
  desactivarloading(): void {
    this.swchloading$.emit(false);
    this.mensaje = null;
  }
  ponermenu(): void {
    this.menuok$.emit (true);
  }
  quitarrmenu(): void {
    this.menuok$.emit(false);
  }
}
