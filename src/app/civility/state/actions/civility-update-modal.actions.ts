import { props, createAction } from '@ngrx/store';

import { Civility } from '@app/civility/models/civility';

export const updateCivility = createAction(
  '[Update civility modal] Update civility',
  props<{ data: { id: number; civility: Civility } }>()
);
