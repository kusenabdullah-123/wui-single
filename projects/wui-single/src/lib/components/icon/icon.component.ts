import { Component, input as inputSignal, computed } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'wui-icon',
  standalone: true,
  template: `<span [innerHTML]="svgIcon()"></span>`,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }
    :host ::ng-deep svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `]
})
export class IconComponent {
  // Accept SVG path data from @mdi/js
  readonly icon = inputSignal<string>('');

  readonly svgIcon = computed<SafeHtml>(() => {
    const pathData = this.icon();
    if (!pathData) return '';
    
    const svg = `<svg viewBox="0 0 24 24"><path d="${pathData}"/></svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  });

  constructor(private sanitizer: DomSanitizer) {}
}
