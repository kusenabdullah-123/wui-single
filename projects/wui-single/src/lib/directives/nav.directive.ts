import { Directive, input, model, output, EventEmitter, inject } from '@angular/core';
import { NavService } from '../services/nav.service';

@Directive({
  selector: '[wuiNavRoot]',
  standalone: true,
  host: {
    '(click)': 'navigateToRoot()'
  }
})
export class NavRootDirective {

  private navService = inject(NavService);

  name = input.required<string>({ alias: 'wuiNavRoot' });
  
  params = input<Record<string, unknown>>({}, { alias: 'wuiNavParams' });

  navigated = output<void>();

  navigateToRoot() {
    this.navService.setRoot(this.name());
    this.navigated.emit();
  }
}

@Directive({
  selector: '[wuiNavPush]',
  standalone: true,
  host: {
    '(click)': 'navigatePush()'
  }
})
export class NavPushDirective {
  name = input.required<string>({ alias: 'wuiNavPush' });
  
  params = input<Record<string, unknown>>({}, { alias: 'wuiNavParams' });

  navigated = output<void>();

  constructor(private navService: NavService) {}

  navigatePush() {
    this.navService.push(this.name());
    this.navigated.emit();
  }
}

@Directive({
  selector: '[wuiNavPop]',
  standalone: true,
  host: {
    '(click)': 'navigatePop()'
  }
})
export class NavPopDirective {
  // Optional pop params
  params = input<unknown>(null, { alias: 'wuiNavParams' });

  // Navigation event output
  navigated = output<void>();

  constructor(private navService: NavService) {}

  navigatePop() {
    this.navService.pop(this.params());
    this.navigated.emit();
  }
}