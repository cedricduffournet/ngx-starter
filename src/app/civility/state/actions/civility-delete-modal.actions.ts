import { props, createAction } from '@ngrx/store';

import { Civility } from '@app/civility/models/civility';

export const deleteCivility = createAction(
  '[Delete civility modal] Delete civility',
  props<{ civility: Civility }>()
);
