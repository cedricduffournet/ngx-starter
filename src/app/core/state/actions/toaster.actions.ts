import { props, createAction } from '@ngrx/store';
import { ToasterParams } from '@app/core/containers/toaster';
export const pop = createAction(
  '[Toaster] Pop toaster',
  props<{ params: ToasterParams }>()
);
