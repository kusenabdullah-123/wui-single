import { Component } from '@angular/core';

@Component({
  selector: 'wui-page',
  standalone: true,
  template: `
    <ng-content select="wui-app-bar"></ng-content>
    <ng-content select=".wui-page-inner"></ng-content>
    <ng-content select=".wui-page-footer"></ng-content>
  `
})
export class PageComponent {}