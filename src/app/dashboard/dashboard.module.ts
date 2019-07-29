import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { DASHBOARD_ROUTES } from '@app/dashboard/dashboard.routing';
import { DashboardViewComponent } from '@app/dashboard/dashboard-view/dashboard-view.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(DASHBOARD_ROUTES)],
  declarations: [DashboardViewComponent]
})
export class DashboardModule {}
