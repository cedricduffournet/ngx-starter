import { Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

import { AuthGuard } from '@app/authentication/services';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  }
];
