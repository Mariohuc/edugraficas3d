import { Routes } from '@angular/router';
import { FunctionComponent } from './function/function.component';
import { ParametricSurfaceComponent } from './parametric-surface/parametric-surface.component';
import { ParametricCurveComponent } from './parametric-curve/parametric-curve.component';
import { ImplicitSurfaceComponent } from "./implicit-surface/implicit-surface.component";

export const VrRoutes: Routes = [
  {
    path: 'function-grapher',
    component: FunctionComponent,
  },
  {
    path: 'parametric-surface-grapher',
    component: ParametricSurfaceComponent,
  },
  {
    path: 'parametric-curve-grapher',
    component: ParametricCurveComponent,
  },
  {
    path: 'implicit-surface-grapher',
    component: ImplicitSurfaceComponent
  }
];
