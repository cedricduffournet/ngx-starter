import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginViewComponent,
  SendResetPasswordViewComponent,
  ResetPasswordViewComponent,
  RegisterViewComponent,
  RegisterConfirmViewComponent
} from '@app/authentication/containers';
import { authConfig } from '@app/authentication/auth.config';

const AUTHENTICATION_ROUTES: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: 'resetting', component: SendResetPasswordViewComponent },
  {
    path: `${authConfig.path.passwordResetConfirm}/:token`,
    component: ResetPasswordViewComponent
  },
  { path: 'register', component: RegisterViewComponent },
  {
    path: `${authConfig.path.registerConfirm}/:token`,
    component: RegisterConfirmViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(AUTHENTICATION_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
