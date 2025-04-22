import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { AppBarComponent, DrawerTogglerDirective, IconComponent, PageComponent, PageService } from '@wajek/wui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageComponent, AppBarComponent, IconComponent, DrawerTogglerDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);


  ngOnInit() {
    this.pageService.replace(this.pageTemplate()!);
  }
  
}
