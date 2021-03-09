import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { DashboardRoutes } from './dashboard.routing'
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainContentComponent } from './components/main-content/main-content.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
  declarations: [MainContentComponent, AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    DemoMaterialModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
