import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { AppBarComponent, IconComponent, PageComponent, PageService, WuiService } from '@wajek/wui';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-artikel-comments',
  standalone: true,
  imports: [RouterOutlet, AppBarComponent,IconComponent, PageComponent],
  templateUrl: './artikel-comments.component.html',
  styleUrl: './artikel-comments.component.scss'
})
export class ArtikelCommentsComponent {

  pageTemplate = viewChild('pageTemplate', {read: TemplateRef});
  pageService = inject(PageService);
  pageRef?: any;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  wuiService = inject(WuiService);

  unsub: Subject<any> = new Subject();

  back() {
    this.pageRef.close(null);
  }

  ngOnInit() {
    this.wuiService.openLoading();
    setTimeout(() => {
      this.wuiService.closeLoading();
      this.pageRef = this.pageService.open(this.pageTemplate()!);
      this.pageRef.closed.pipe(filter((v) => !this.pageService.isCloseAll), takeUntil(this.unsub)).subscribe(() => {
        this.router.navigate(['../'], {
          relativeTo: this.activatedRoute
        });
      });
    }, 1000);
  }

  ngOnDestroy() {
    this.unsub.next(null);
    this.pageRef.close();
  }
  
}
