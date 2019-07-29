import { reducer } from '@app/core/state/reducers/http-progress.reducer';
import * as fromHttpProgress from '@app/core/state/reducers/http-progress.reducer';

import { HttpProgressActions } from '@app/core/state/actions';

describe('HttpProgressReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('BEGIN', () => {
    it('should return state with processing true and new entry in proccess list and url', () => {
      const action = HttpProgressActions.begin({ url: '/test_begin' });
      const result = reducer(fromHttpProgress.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('COMPLETE', () => {
    it('should remove elem in process list, set url and set processing to false', () => {
      const initialState = {
        ...fromHttpProgress.INITIAL_STATE,
        processing: true,
        processList: [true]
      };
      const action = HttpProgressActions.complete({ url: '/test_complete' });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getProcessing', () => {
      it('shoud retrieve processing (true)', () => {
        const result = fromHttpProgress.getProcessing({
          ...fromHttpProgress.INITIAL_STATE,
          processing: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getProcessList', () => {
      it('shoud retrieve process list', () => {
        const result = fromHttpProgress.getProcessList({
          ...fromHttpProgress.INITIAL_STATE,
          processList: [true, true, true]
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
