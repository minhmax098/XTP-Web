import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    children: [
    { path: 'demo', loadComponent: () => import('./demo/demo.component').then(c => c.DemoComponent) },
      {
        path: 'test',
        loadComponent: () =>
          import('./landing/landing.component').then((m) => m.LandingComponent),
      },
    ],
  },
];

export default ROUTES;