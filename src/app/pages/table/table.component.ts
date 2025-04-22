import { Component } from '@angular/core';
import { AppBarComponent, IconComponent, PageComponent } from '@wajek/wui';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [PageComponent, AppBarComponent, IconComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

}
