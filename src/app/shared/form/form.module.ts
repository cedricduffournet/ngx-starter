import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { TextInputComponent } from '@app/shared/form/text-input';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  exports: [TextInputComponent],
  declarations: [TextInputComponent]
})
export class FormModule {}
