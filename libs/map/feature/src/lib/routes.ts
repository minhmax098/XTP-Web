import { Route } from '@angular/router';
  
      export const ROUTES: Route[] = [{
        path: '',
        // component: LayoutComponent,
        children: [
          // Wildcard Route
          // { path: '**', redirectTo: '/' }
        ]
      }];
      
      export default ROUTES;
      