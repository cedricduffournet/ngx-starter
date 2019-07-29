import { NgModule } from '@angular/core';

import { LogoComponent } from '@app/shared/logo/logo.component';

@NgModule({
  exports: [LogoComponent],
  declarations: [LogoComponent]
})
export class LogoModule {}
