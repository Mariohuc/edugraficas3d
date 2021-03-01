import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ArRoutes } from './ar.routing';
import { ArFunctionComponent } from './ar-function/ar-function.component';

import { ArFunctionIframeComponent } from "./components/ar-function-iframe.component";

@NgModule({
  declarations: [ArFunctionComponent, ArFunctionIframeComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(ArRoutes)
  ],
  entryComponents: [ArFunctionIframeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArModule { }
