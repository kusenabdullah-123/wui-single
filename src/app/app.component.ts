import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DrawerComponent, DrawerItemComponent, AppComponent as WuiAppComponent } from '@wajek/wui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WuiAppComponent, DrawerComponent,DrawerItemComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
