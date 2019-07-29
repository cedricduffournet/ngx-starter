import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActionsItemComponent } from '@app/shared/actions-item/actions-item.component';
import { IconsModule } from '@app/shared/icons/icons.module';

@NgModule({
  imports: [CommonModule, IconsModule],
  exports: [ActionsItemComponent],
  declarations: [ActionsItemComponent]
})
export class ActionsItemsModule {}
