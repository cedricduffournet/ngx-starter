import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { CivilityModule } from '@app/civility/civility.module';
import { LangSwitcherModule } from '@app/shared/lang-switcher/lang-switcher.module';
import { LogoModule } from '@app/shared/logo/logo.module';
import { AuthRoutingModule } from '@app/authentication/auth-routing.module';
import { AuthEffects } from '@app/authentication/state/effects';
import { reducers } from '@app/authentication/state/reducers';
import { AuthFacade } from '@app/authentication/state/auth.facade';

import {
  LoginViewComponent,
  SendResetPasswordViewComponent,
  ResetPasswordViewComponent,
  RegisterViewComponent,
  RegisterConfirmViewComponent,
  LogoutModalComponent
} from '@app/authentication/containers';

import {
  AuthLayoutComponent,
  LoginFormComponent,
  ResetPasswordFormComponent,
  SendResetPasswordFormComponent,
  RegisterFormComponent
} from '@app/authentication/components';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    LangSwitcherModule,
    LogoModule,
    CivilityModule
  ],
  declarations: [
    AuthLayoutComponent,
    LoginViewComponent,
    SendResetPasswordViewComponent,
    ResetPasswordViewComponent,
    RegisterViewComponent,
    RegisterConfirmViewComponent,
    LoginFormComponent,
    ResetPasswordFormComponent,
    SendResetPasswordFormComponent,
    LogoutModalComponent,
    RegisterFormComponent
  ],
  entryComponents: [LogoutModalComponent],
  providers: [AuthFacade]
})
export class AuthModule {}
