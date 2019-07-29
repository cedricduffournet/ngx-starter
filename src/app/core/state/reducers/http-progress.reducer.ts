import { createReducer, on } from '@ngrx/store';
import { HttpProgressActions } from '@app/core/state/actions';

export interface State {
  processing: boolean;
  processList: boolean[];
  url: string;
}

export const INITIAL_STATE: State = {
  processing: false,
  processList: [],
  url: ''
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(HttpProgressActions.begin, (state, { url }) => ({
    processing: true,
    url,
    processList: [...state.processList, true]
  })),
  on(HttpProgressActions.complete, (state, { url }) => ({
    processing: false,
    url,
    processList: [...state.processList.slice(1, state.processList.length)]
  }))
);

export const getProcessing = (state: State) => state.processing;
export const getProcessList = (state: State) => state.processList;
