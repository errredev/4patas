import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: Renderer2;
  constructor(private renderFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
   this.renderer = this.renderFactory.createRenderer (null, null);
  }

  darkMode() {
    this.renderer.addClass (this.document.body, 'dark-theme');
  }
  ligthMode() {
    this.renderer.addClass(this.document.body, 'light-theme');
  }
}
