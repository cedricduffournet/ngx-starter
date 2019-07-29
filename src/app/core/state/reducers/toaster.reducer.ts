import { ToasterParams } from '@app/core/containers/toaster';
import { ToasterActions } from '@app/core/state/actions';
import { createReducer, on } from '@ngrx/store';
export interface State {
  params: ToasterParams;
}

export const INITIAL_STATE: State = {
  params: {
    type: '',
    title: '',
    body: '',
    clear: false,
    timeout: null
  }
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(ToasterActions.pop, (state, { params }) => ({
    ...state,
    params
  }))
);

export const getParams = (state: State) => state.params;
