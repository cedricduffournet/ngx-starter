import { InjectionToken } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
  Action
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from '@app/core/state/reducers/layout.reducer';
import * as fromToaster from '@app/core/state/reducers/toaster.reducer';
import * as fromHttpProgress from '@app/core/state/reducers/http-progress.reducer';
import * as fromAuth from '@app/authentication/state/reducers';
import { RouterStateUrl } from '@app/core/utils/custom-route-serializer';

export interface State {
  layout: fromLayout.State;
  toaster: fromToaster.State;
  http: fromHttpProgress.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token',
  {
    factory: () => ({
      layout: fromLayout.reducer,
      toaster: fromToaster.reducer,
      http: fromHttpProgress.reducer,
      router: fromRouter.routerReducer
    })
  }
);

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export const getPageTitle = createSelector(
  getRouterState,
  router => {
    if (router.state.data && router.state.data.title) {
      return router.state.data.title;
    }
    return '';
  }
);

export const getPreviousLink = createSelector(
  getRouterState,
  state => {
    if (state.state.data && state.state.data.previousLink) {
      return state.state.data.previousLink;
    }
    return null;
  }
);

export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
  'layout'
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);

export const getMenu = createSelector(
  getLayoutState,
  fromLayout.getMenu
);

export const getUserMenu = createSelector(
  getMenu,
  fromAuth.getLoggedUser,
  (menu, loggedUser) => {
    if (!loggedUser) {
      return [];
    }
    return menu.filter(item =>
      item.roles.some(role => loggedUser.roles.indexOf(role) !== -1)
    );
  }
);

export const getToasterState = createFeatureSelector<State, fromToaster.State>(
  'toaster'
);

export const getToasterParams = createSelector(
  getToasterState,
  fromToaster.getParams
);

export const getHttpState = createFeatureSelector<
  State,
  fromHttpProgress.State
>('http');

export const getHttpProcessList = createSelector(
  getHttpState,
  fromHttpProgress.getProcessList
);

export const isHttpProcessing = createSelector(
  getHttpProcessList,
  processList => processList.length !== 0
);
