import { Routes } from '@angular/router';

import { FullComponent } from './layout/full/full.component'

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule ),
  },
  {
    path: 'vr',
    loadChildren: () => import('./vr/vr.module').then( m => m.VrModule),
  },
  {
    path: 'ar',
    loadChildren: () => import('./ar/ar.module').then( m => m.ArModule),
  },
];
