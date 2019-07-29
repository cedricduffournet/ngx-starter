import { createReducer, on } from '@ngrx/store';

import {
  CivilityAddModalActions,
  CivilityDeleteModalActions,
  CivilityListViewActions,
  CivilityApiActions
} from '@app/civility/state/actions';

export interface State {
  ids: number[];
  loading: boolean;
  loaded: boolean;
  deleting: boolean;
  deleted: boolean;
  adding: boolean;
  added: boolean;
}

export const INITIAL_STATE: State = {
  ids: [],
  adding: false,
  added: false,
  deleting: false,
  deleted: false,
  loading: false,
  loaded: false
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(CivilityListViewActions.loadCivilities, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(CivilityApiActions.loadCivilitySuccess, (state, { civilities }) => ({
    ...state,
    loading: false,
    loaded: true,
    ids: civilities.result
  })),
  on(CivilityApiActions.loadCivilityFailure, state => ({
    ...state,
    loading: false,
    loaded: false
  })),
  on(CivilityAddModalActions.addCivility, state => ({
    ...state,
    adding: true,
    added: false
  })),
  on(CivilityApiActions.addCivilitySuccess, (state, { civility }) => ({
    ...state,
    ids: [...state.ids, civility.result],
    adding: false,
    added: true
  })),
  on(
    CivilityApiActions.addCivilityFailure,
    CivilityListViewActions.showAddCivilityModal,
    state => ({
      ...state,
      adding: false,
      added: false
    })
  ),
  on(CivilityDeleteModalActions.deleteCivility, state => ({
    ...state,
    deleting: true,
    deleted: false
  })),
  on(CivilityApiActions.deleteCivilitySuccess, (state, { id }) => ({
    ...state,
    ids: state.ids.filter(civilityId => civilityId !== id),
    deleting: false,
    deleted: true
  })),
  on(
    CivilityApiActions.deleteCivilityFailure,
    CivilityListViewActions.showDeleteCivilityModal,
    state => ({
      ...state,
      deleting: false,
      deleted: false
    })
  )
);

export const getIds = (state: State) => state.ids;
export const getDeleting = (state: State) => state.deleting;
export const getDeleted = (state: State) => state.deleted;
export const getAdding = (state: State) => state.adding;
export const getAdded = (state: State) => state.added;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
