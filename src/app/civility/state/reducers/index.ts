import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';

import * as fromRoot from '@app/core/state/reducers';
import * as fromCivilityCollection from '@app/civility/state/reducers/civility-collection.reducer';
import * as fromCivilityEntities from '@app/civility/state/reducers/civility-entities.reducer';
import * as fromAuth from '@app/authentication/state/reducers';
import { Civility } from '@app/civility/models/civility';
import { Authorization } from '@app/core/models/authorization.model';

export interface CivilitiesState {
  collection: fromCivilityCollection.State;
  civilities: fromCivilityEntities.State;
}

export interface State extends fromRoot.State {
  civilities: CivilitiesState;
}

export function reducers(state: CivilitiesState | undefined, action: Action) {
  return combineReducers({
    collection: fromCivilityCollection.reducer,
    civilities: fromCivilityEntities.reducer
  })(state, action);
}

export const selectCivilitiesState = createFeatureSelector<
  State,
  CivilitiesState
>('civilities');

export const getCivilityEntitiesState = createSelector(
  selectCivilitiesState,
  state => state.civilities
);

export const getCivilityEntities = createSelector(
  getCivilityEntitiesState,
  fromCivilityEntities.getEntities
);

export const getCivilityEntitiesUpdating = createSelector(
  getCivilityEntitiesState,
  fromCivilityEntities.getUpdating
);

export const getCivilityEntitiesUpdated = createSelector(
  getCivilityEntitiesState,
  fromCivilityEntities.getUpdated
);

export const getCivilityCollectionState = createSelector(
  selectCivilitiesState,
  state => state.collection
);
export const getCivilityIds = createSelector(
  getCivilityCollectionState,
  fromCivilityCollection.getIds
);
export const getCivilityCollectionAdding = createSelector(
  getCivilityCollectionState,
  fromCivilityCollection.getAdding
);
export const getCivilityCollectionAdded = createSelector(
  getCivilityCollectionState,
  fromCivilityCollection.getAdded
);
export const getCivilityCollectionDeleting = createSelector(
  getCivilityCollectionState,
  fromCivilityCollection.getDeleting
);
export const getCivilityCollectionDeleted = createSelector(
  getCivilityCollectionState,
  fromCivilityCollection.getDeleted
);

export const getCivilities = createSelector(
  getCivilityEntities,
  getCivilityIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getSelectedCivilityId = createSelector(
  getCivilityEntitiesState,
  fromCivilityEntities.getSelectedId
);

export const getSelectedCivility = createSelector(
  getCivilityEntities,
  getSelectedCivilityId,
  (civilityEntities, civilityId): Civility => {
    return civilityEntities[civilityId];
  }
);

export const canUpdateCivility = createSelector(
  fromAuth.getAuthorized(['ROLE_CIVILITY_EDIT']),
  canUpdate => canUpdate
);

export const canDeleteCivility = createSelector(
  fromAuth.getAuthorized(['ROLE_CIVILITY_DELETE']),
  canDelete => canDelete
);

export const canCreateCivility = createSelector(
  fromAuth.getAuthorized(['ROLE_CIVILITY_CREATE']),
  canCreate => canCreate
);

export const getCivilityAuthorization = createSelector(
  canUpdateCivility,
  canDeleteCivility,
  canCreateCivility,
  (canUpdate, canDelete, canAdd): Authorization => {
    return {
      update: canUpdate,
      delete: canDelete,
      create: canAdd
    };
  }
);
