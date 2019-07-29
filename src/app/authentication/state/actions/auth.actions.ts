import { createAction } from '@ngrx/store';

export const loadLoggedUser = createAction('[Auth] Load logged user');
export const loadToken = createAction('[Auth] load token');
export const logout = createAction('[Auth] log out');
export const showLogoutModal = createAction(
  '[Auth] show log out modal confirm'
);
export const reloadUser = createAction('[Auth] Reload user');
