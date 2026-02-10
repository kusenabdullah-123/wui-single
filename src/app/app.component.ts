import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DrawerComponent, DrawerItemComponent, AppComponent as WuiAppComponent } from '@wajek/wui';
import { mdiHome, mdiTextLong, mdiLoginVariant, mdiTable } from '@mdi/js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WuiAppComponent, DrawerComponent, DrawerItemComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Expose icons to template - only these 4 icons will be bundled!
  readonly icons = {
    home: mdiHome,
    textLong: mdiTextLong,
    loginVariant: mdiLoginVariant,
    table: mdiTable
  };
}
