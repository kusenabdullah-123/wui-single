import { CommonModule } from "@angular/common";
import { Component, inject, input, HostListener, AfterContentInit, ContentChild, effect, HostBinding, OnDestroy, signal } from "@angular/core";
import { MessageService } from "../../services/message.service";
import { Subject, takeUntil } from "rxjs";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: 'wui-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (show()) {
      <div class="wui-drawer-backdrop" (click)="show.set(false)"></div>
    }
    <ng-content></ng-content>`,
})
export class DrawerComponent implements AfterContentInit, OnDestroy {
  _showInput = input(false, { 
    transform: (value: boolean | string) => value != null && `${value}` !== 'false' 
  });

  show = signal(this._showInput());
  private isMobile = signal(this.isMobileDevice());
  
  @ContentChild(AvatarComponent) avatar?: AvatarComponent;

  private messageService = inject(MessageService);
  private unsub = new Subject<void>();

  constructor() {
    effect(() => {
      this.isShow = this.show();
    }, { allowSignalWrites: true });
  }

  @HostBinding('class.show') 
  isShow = false;

  @HostListener('click', ['$event']) 
  onClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'WUI-DRAWER-ITEM' && 
        target.offsetParent?.tagName !== 'WUI-DRAWER-ITEM') {
      return;
    }
    this.drawerItemClicked();
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  }

  drawerItemClicked() {
    if (this.isMobile()) {
      this.show.set(false);
    }
  }

  ngAfterContentInit() {
    this.show.set(!this.isMobile());
  }

  ngOnInit(): void {
    this.messageService.get('wui:toggleDrawer')
      .pipe(takeUntil(this.unsub))
      .subscribe(() => {
        this.show.update(v => !v);
      });
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }
}