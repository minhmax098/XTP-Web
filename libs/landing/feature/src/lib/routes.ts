import { Route } from "@angular/router";
import { LandingLayoutComponent } from "@viettelweb/layout/feature";

export const ROUTES: Route[] = [
  {
    path: "",
    component: LandingLayoutComponent,
    children: [
      {
        path: "introduce",
        loadComponent: () =>
          import("./introduce/introduce.component").then(
            (c) => c.IntroduceComponent
          ),
      },
      {
        path: "homepage",
        loadComponent: () =>
          import("./homepage/homepage.component").then(
            (c) => c.HomepageComponent
          ),
      },
      // Wildcard Route
      // { path: '**', redirectTo: '/' }
    ],
  },
];

export default ROUTES;
