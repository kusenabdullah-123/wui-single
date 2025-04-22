import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'artikel',
    loadComponent: () => import('./pages/artikel/artikel.component')
      .then(m => m.ArtikelComponent),
    children: [
      {
        path: 'share',
        loadComponent: () => import('./pages/artikel-share/artikel-share.component')
          .then(m => m.ArtikelShareComponent),
        children: [
          {
            path: 'stack',
            loadComponent: () => import('./pages/artikel-share/artikel-share.component')
              .then(m => m.ArtikelShareComponent)
          }
        ]
      },
      {
        path: 'comments',
        loadComponent: () => import('./pages/artikel-comments/artikel-comments.component')
          .then(m => m.ArtikelCommentsComponent),
        children: [
          {
            path: 'baru',
            loadComponent: () => import('./pages/artikel-comment-form/artikel-comment-form.component')
              .then(m => m.ArtikelCommentFormComponent)
          }
        ]
      }
    ]
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.component')
      .then(m => m.SigninComponent)
  },
  {
    path: 'table',
    loadComponent: () => import('./pages/table/table.component')
      .then(m => m.TableComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];