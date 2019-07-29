import { props, createAction } from '@ngrx/store';

import { NormalizedData } from '@app/shared/models/normalized.model';

export const loadCivilitySuccess = createAction(
  '[Civility API] Load civility SUCCESS',
  props<{ civilities: NormalizedData }>()
);

export const loadCivilityFailure = createAction(
  '[Civility API] Load civility FAILURE',
  props<{ error: any }>()
);

export const addCivilitySuccess = createAction(
  '[Civility API] Add civility SUCCESS',
  props<{ civility: NormalizedData }>()
);

export const addCivilityFailure = createAction(
  '[Civility API] Add civility FAILURE',
  props<{ error: any }>()
);

export const updateCivilitySuccess = createAction(
  '[Civility/entities] Update civility SUCCESS',
  props<{ civility: NormalizedData }>()
);

export const updateCivilityFailure = createAction(
  '[Civility/entities] Update civility FAILURE',
  props<{ error: any }>()
);

export const deleteCivilitySuccess = createAction(
  '[Civility API] Remove civility SUCCESS',
  props<{ id: number }>()
);

export const deleteCivilityFailure = createAction(
  '[Civility API] Remove civility FAILURE',
  props<{ error: any }>()
);
