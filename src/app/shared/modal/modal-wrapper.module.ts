import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalWrapperComponent } from '@app/shared/modal/modal-wrapper.component';

@NgModule({
  imports: [CommonModule],
  exports: [ModalWrapperComponent],
  declarations: [ModalWrapperComponent]
})
export class ModalWrapperModule {}
