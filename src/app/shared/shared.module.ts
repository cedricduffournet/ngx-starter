import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { PageInnerModule } from '@app/shared/page-inner';
import { IconsModule } from '@app/shared/icons';
import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';
import { ButtonModule } from '@app/shared/button';

const MODULES_EXPORT = [
  CommonModule,
  ReactiveFormsModule,
  TranslateModule,
  ActionsItemsModule,
  PageInnerModule,
  IconsModule,
  FormModule,
  ValidationActionModule,
  ModalWrapperModule,
  ButtonModule
];

@NgModule({
  exports: MODULES_EXPORT
})
export class SharedModule {}
