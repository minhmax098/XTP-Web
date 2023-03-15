import { Route } from '@angular/router';
import { LandingLayoutComponent } from '@viettelweb/layout/feature';

export const ROUTES: Route[] = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
    { path: 'news', loadComponent: () => import('./news/news.component').then(c => c.NewsComponent) },
    { path: 'viewer3-d', loadComponent: () => import('./viewer3-d/viewer3-d.component').then(c => c.Viewer3DComponent) },
    { path: 'introduce', loadComponent: () => import('./introduce/introduce.component').then(c => c.IntroduceComponent) },
      {
        path: 'homepage',
        loadComponent: () =>
          import('./homepage/homepage.component').then(
            (c) => c.HomepageComponent
          ),
      },
      // Wildcard Route
      // { path: '**', redirectTo: '/' }
    ],
  },
];

export default ROUTES