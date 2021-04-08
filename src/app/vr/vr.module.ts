import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function/function.component';

import { RouterModule } from '@angular/router'
import { DemoMaterialModule } from '../demo-material-module'

import { VrRoutes } from './vr.routing';
import { ParametricSurfaceComponent } from './parametric-surface/parametric-surface.component';
import { ImplicitSurfaceComponent } from './implicit-surface/implicit-surface.component';
import { ParametricCurveComponent } from './parametric-curve/parametric-curve.component';

@NgModule({
  declarations: [ FunctionComponent, ParametricSurfaceComponent, ImplicitSurfaceComponent, ParametricCurveComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(VrRoutes)
  ],
})
export class VrModule { }
