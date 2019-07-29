import { props, createAction } from '@ngrx/store';

import { Civility } from '@app/civility/models/civility';

export const addCivility = createAction(
  '[Add civility modal] Add civility',
  props<{ civility: Civility }>()
);
