import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  {
    path: "",
    // component: LayoutComponent,
    children: [
      {
        path: "map",
        loadComponent: () =>
          import("./map/map.component").then((c) => c.MapComponent),
      },
      // Wildcard Route
      // { path: '**', redirectTo: '/' }
    ],
  },
];

export default ROUTES;
