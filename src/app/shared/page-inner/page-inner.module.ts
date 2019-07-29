import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageInnerComponent } from '@app/shared/page-inner/page-inner.component';

@NgModule({
  imports: [CommonModule],
  exports: [PageInnerComponent],
  declarations: [PageInnerComponent]
})
export class PageInnerModule {}
