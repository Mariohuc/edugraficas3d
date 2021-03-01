import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SpinnerComponent } from './shared/spinner.component';
import { FullComponent } from './layout/full/full.component';
import { MathjaxComponent } from './shared/mathjax/mathjax.component';
import { MathjaxDialogComponent } from './shared/mathjax-dialog/mathjax-dialog.component';
import { GlobalService } from "./shared/services/global.service";

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    MathjaxDialogComponent,
    MathjaxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( AppRoutes, { useHash: true, relativeLinkResolution: 'legacy' }),
    DemoMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [ GlobalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
