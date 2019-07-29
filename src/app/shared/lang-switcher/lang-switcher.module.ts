import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LangSwitcherComponent } from '@app/shared/lang-switcher/lang-switcher.component';

@NgModule({
  imports: [CommonModule],
  exports: [LangSwitcherComponent],
  declarations: [LangSwitcherComponent]
})
export class LangSwitcherModule {}
