import { Routes } from '@angular/router';
import { AuthGuard } from '@app/authentication/services';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'parameters',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CIVILITY_VIEW'] },
    loadChildren: () =>
      import('@app/parameters/parameters.module').then(
        mod => mod.ParametersModule
      )
  }
];
