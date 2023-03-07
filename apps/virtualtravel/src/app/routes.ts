import { Route } from "@angular/router";

export const ROUTES: Route[] = [
  {
    path: "virtual-tour",
    loadChildren: () =>
      import("@viettelweb/virtual-tour-360/feature").then(
        (c) => c.VirtualTourFeatureModule
      ),
  },
  {
    path: "authen",
    loadChildren: () =>
      import("@viettelweb/authen/feature").then((c) => c.AuthenFeatureModule),
  },
  {
    path: "landing",
    loadChildren: () =>
      import("@viettelweb/landing/feature").then((c) => c.LandingFeatureModule),
  },
  {
    path: "error",
    loadChildren: () =>
      import("@viettelweb/error/feature").then((c) => c.ErrorFeatureModule),
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("@viettelweb/welcome/feature").then((m) => m.WelcomeFeatureModule),
  },
  { path: "**", redirectTo: "/landing/homepage" },
];

export default ROUTES;
