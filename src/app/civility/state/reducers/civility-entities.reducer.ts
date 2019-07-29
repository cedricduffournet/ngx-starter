import { createReducer, on } from '@ngrx/store';

import { EntityState } from '@app/shared/models/EntityState';
import {
  CivilityListViewActions,
  CivilityApiActions,
  CivilityUpdateModalActions
} from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';
import { NormalizedData } from '@app/shared/models/normalized.model';

export type CivilityEntities = EntityState<Civility>;

export interface State {
  entities: CivilityEntities;
  selectedId: number | null;
  updating: boolean;
  updated: boolean;
}

export const INITIAL_STATE: State = {
  entities: {},
  selectedId: null,
  updating: false,
  updated: false
};

function updateCivility(state: State, civility: NormalizedData): State {
  const id: number = civility.result;
  return {
    ...state,
    entities: {
      ...state.entities,
      [id]: civility.entities.civilities[id]
    },
    updated: true,
    updating: false
  };
}
export const reducer = createReducer(
  INITIAL_STATE,
  on(CivilityApiActions.loadCivilitySuccess, (state, { civilities }) => ({
    ...state,
    entities: civilities.entities.civilities
  })),
  on(CivilityUpdateModalActions.updateCivility, state => ({
    ...state,
    updated: false,
    updating: true
  })),
  on(CivilityApiActions.updateCivilitySuccess, (state, { civility }) =>
    updateCivility(state, civility)
  ),
  on(
    CivilityApiActions.updateCivilityFailure,
    CivilityListViewActions.showUpdateCivilityModal,
    state => ({
      ...state,
      updating: false,
      updated: false
    })
  ),
  on(CivilityApiActions.addCivilitySuccess, (state, { civility }) => ({
    ...state,
    entities: {
      ...state.entities,
      ...civility.entities.civilities
    }
  })),
  on(CivilityListViewActions.selectCivility, (state, { id }) => ({
    ...state,
    selectedId: id
  }))
);

export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId as number;
export const getUpdating = (state: State) => state.updating;
export const getUpdated = (state: State) => state.updated;
