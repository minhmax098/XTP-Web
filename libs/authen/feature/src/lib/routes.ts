import { Route } from '@angular/router';
import { AuthenLayoutComponent } from '@viettelweb/layout/feature';

export const ROUTES: Route[] = [
  {
    path: '',
    component: AuthenLayoutComponent,
    children: [
      {
        path: 'notification',
        loadComponent: () =>
          import('./notification/notification.component').then(
            (c) => c.NotificationComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./signup/signup.component').then((c) => c.SignupComponent),
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./signin/signin.component').then((c) => c.SigninComponent),
      },
      // Wildcard Route
      // { path: '**', redirectTo: '/' }
    ],
  },
];

export default ROUTES;
