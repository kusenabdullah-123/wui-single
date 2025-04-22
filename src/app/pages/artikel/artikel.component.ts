import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppBarComponent, ContextMenuDirective, ContextMenuItemDirective, ContextMenuTriggerDirective, FormFieldComponent, IconComponent, MenuComponent, MenuItemComponent, PageComponent, PageService, WuiInputDirective, WuiService } from '@wajek/wui';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-artikel',
  standalone: true,
  imports: [PageComponent, AppBarComponent, IconComponent, RouterOutlet, MenuComponent, MenuItemComponent, FormFieldComponent, WuiInputDirective, ContextMenuDirective, ContextMenuItemDirective, ContextMenuTriggerDirective, RouterLink],
  templateUrl: './artikel.component.html',
  styleUrl: './artikel.component.scss'
})
export class ArtikelComponent {

  socialMedia = '';
  tplDialog = viewChild('tplDialog', {read: TemplateRef});

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);
  router = inject(Router);
  wuiService = inject(WuiService);

  unsub: Subject<any> = new Subject<any>();

  constructor() { }

  async shareToFacebook() {
    let res: any = await this.wuiService.dialog({
      title: 'Confirmation',
      message: 'Share to Facebook ?',
      buttons: ['Batal', 'Share']
    });
    if(res == 1) {
      this.wuiService.openLoading();
      setTimeout(() => {
        this.wuiService.closeLoading();
      }, 5000);
    }
  }

  async shareToTwitter() {
    let res: any = await this.wuiService.dialog({
      title: 'Confirmation',
      message: 'Share to Twitter ?',
      buttons: ['Batal', 'Share']
    });
    if(res == 1) {
      this.wuiService.dialog({
        title: 'Agree',
        message: 'Viola, you agree to share this article to Twitter !',
        buttons: ['Ok']
      });
    }
  }

  wuiMenuOpened() {
    console.log('opened');
  }

  wuiMenuClosed() {
    console.log('closed');
  }

  async shareToEmail() {
    let res: any = await this.wuiService.dialog({
      title: 'Confirmation',
      message: 'Share to Email ?',
      buttons: ['Batal', 'Share']
    });
    if(res == 1) {
      this.wuiService.dialog({
        title: 'Agree',
        message: 'Viola, you agree to share this article to Email !',
        buttons: ['Ok']
      });
    }
  }

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

  ngOnDestroy() {
    this.unsub.next(null);
  }
  
}
