import { Component } from '@angular/core';

@Component({
  selector: 'wui-list-tile',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class ListTileComponent { }

@Component({
  selector: 'wui-list',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class ListComponent { }
