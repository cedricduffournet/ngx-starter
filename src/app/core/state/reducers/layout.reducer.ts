import { LayoutCoreActions } from '@app/core/state/actions';
import { appMenu } from '@app/shell/shared/menu.model';
import { createReducer, on } from '@ngrx/store';
import { Menu } from '@app/shell/shared/menu.model';

export interface State {
  showSidenav: boolean;
  menu: Menu[];
}

export const INITIAL_STATE: State = {
  showSidenav: false,
  menu: appMenu
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(LayoutCoreActions.toggleMenu, state => ({
    ...state,
    showSidenav: !state.showSidenav
  }))
);

export const getShowSidenav = (state: State) => state.showSidenav;
export const getMenu = (state: State) => state.menu;
