import { Component, ElementRef, inject } from "@angular/core";
import { WuiPage } from "./page-overlay.service";

@Component({
    selector: 'wui-page-host',
    standalone: true,
    template: `<ng-content></ng-content>`
})
export class PageHostComponent {

    pageDialog = inject(WuiPage);
    elementRef = inject(ElementRef);

    constructor() {
        this.pageDialog.setContainerElement(this.elementRef.nativeElement);
    }

}