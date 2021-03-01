import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { DashboardRoutes } from './dashboard.routing'
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './components/main-content/main-content.component';



@NgModule({
  declarations: [HomeComponent, MainContentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    DemoMaterialModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
