import { Injectable, Inject} from '@angular/core';
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public primary = '#ff3e00';
  public secondary = '#d1d0cc';
  constructor() {

  }

  
}
