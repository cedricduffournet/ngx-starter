import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ValidationButtonComponent } from '@app/shared/validation-action/validation-button';
import { WrapperValidationActionComponent } from '@app/shared/validation-action/wrapper-validation-action';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [ValidationButtonComponent, WrapperValidationActionComponent],
  declarations: [ValidationButtonComponent, WrapperValidationActionComponent]
})
export class ValidationActionModule {}
