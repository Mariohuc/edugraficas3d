import { Routes } from '@angular/router';
import { MainContentComponent } from "./components/main-content/main-content.component";
import { AboutComponent } from "./components/about/about.component";

export const DashboardRoutes: Routes = [
  {
    path: "home",
    component: MainContentComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: "full"
  },
];
