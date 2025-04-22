import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { IconComponent, ModalService, WuiService } from '@wajek/wui';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-artikel-share',
  standalone: true,
  imports: [RouterOutlet, IconComponent],
  templateUrl: './artikel-share.component.html',
  styleUrl: './artikel-share.component.scss'
})
export class ArtikelShareComponent {

  wuiService = inject(WuiService);
  modalService = inject(ModalService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  dialogTpl = viewChild('dialogTpl',{read : TemplateRef})
  rows = signal<Array<number>>([]);

  modalRef?: DialogRef;
  private unsub = new Subject<any>();

  formShare = new FormGroup({
    social: new FormControl(null, Validators.required)
  });

  close() {
    this.modalRef?.close();
  }

  submit() {
    this.wuiService.openLoading();
    setTimeout(() => {
      this.wuiService.closeLoading();
      this.close();
    }, 5000);
  }

  ngOnInit() {
    this.rows.set(Array(10).fill(0).map((v, i) => i + 1));
    this.modalRef = this.modalService.open(this.dialogTpl()!, { width: '400px'});
    this.modalRef?.closed.pipe(takeUntil(this.unsub)).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute});
    });
  }

  rebuild() {
    let count = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    this.rows.set(Array(count).fill(0).map((v, i) => i + 1));
  }

  ngOnDestroy() {
    this.unsub.next(null);
    this.modalRef?.close();
  }

}
