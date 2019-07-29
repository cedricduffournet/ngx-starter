import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LogoModule } from '@app/shared/logo/logo.module';
import { LangSwitcherModule } from '@app/shared/lang-switcher/lang-switcher.module';
import { ActionsItemsModule } from '@app/shared/actions-item/actions-item.module';
import { IconsModule } from '@app/shared/icons/icons.module';

import {
  NavbarComponent,
  DropdownNavbarComponent,
  MenuComponent
} from '@app/shell/components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LogoModule,
    LangSwitcherModule,
    ActionsItemsModule,
    IconsModule
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent, DropdownNavbarComponent, MenuComponent]
})
export class ShellModule {}
