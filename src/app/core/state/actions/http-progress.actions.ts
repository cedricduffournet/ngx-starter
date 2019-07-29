import { createAction, props } from '@ngrx/store';

export const begin = createAction(
  '[HTTP progress] Begin http call',
  props<{ url: string }>()
);

export const complete = createAction(
  '[HTTP complete] Complete http call',
  props<{ url: string }>()
);
