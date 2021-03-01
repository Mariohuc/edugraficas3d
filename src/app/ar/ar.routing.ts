import { Routes } from '@angular/router';
import { ArFunctionComponent } from './ar-function/ar-function.component';
import { ArFunctionGuard } from '../shared/guards/ar-function.guard';

export const ArRoutes: Routes = [
  {
    path: "ar-function-grapher",
    component: ArFunctionComponent,
    canActivate: [ArFunctionGuard]
  },
];