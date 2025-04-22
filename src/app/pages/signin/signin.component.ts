import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { FormFieldComponent, IconComponent, PageComponent, PageService, ToggleComponent, WuiInputDirective } from '@wajek/wui';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [PageComponent, FormFieldComponent, WuiInputDirective, IconComponent, ToggleComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);


  submit() {
    alert('Submitted');
  }

  ngOnInit(): void {
    this.pageService.replace(this.pageTemplate()!);
  }
  
}
