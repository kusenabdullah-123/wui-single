import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { mdiHome, mdiMenu } from '@mdi/js';
import { AppBarComponent, DrawerTogglerDirective, IconComponent, PageComponent, PageService } from '@wajek/wui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageComponent, AppBarComponent, IconComponent, DrawerTogglerDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  pageTemplate = viewChild('pageTemplate', { read: TemplateRef });
  pageService = inject(PageService);
  readonly icons = {
    menu: mdiMenu,
    home: mdiHome
  };

  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }

}
