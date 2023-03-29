import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  {
    path: "",
    // component: LayoutComponent,
    children: [
      {
        path: "video-tour",
        loadComponent: () =>
          import("./video-tour/video-tour.component").then(
            (c) => c.VideoTourComponent
          ),
      },
      {
        path: "tour/:id",
        pathMatch: "full",
        loadComponent: () =>
          import("./tour/tour.component").then((c) => c.TourComponent),
      },
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
