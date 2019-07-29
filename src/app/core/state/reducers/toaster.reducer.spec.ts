import { reducer } from '@app/core/state/reducers/toaster.reducer';
import * as fromToaster from '@app/core/state/reducers/toaster.reducer';

import { ToasterActions } from '@app/core/state/actions';

describe('ToasterReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('POP', () => {
    it('should set params', () => {
      const params = {
        type: 'success',
        title: 'title',
        body: 'body',
        clear: true,
        timeout: 12
      };

      const action = ToasterActions.pop({
        params
      });

      const result = reducer(fromToaster.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getParams', () => {
      it('shoud retrieve params', () => {
        const result = fromToaster.getParams({
          ...fromToaster.INITIAL_STATE,
          params: {
            type: 'success',
            title: 'title',
            body: 'body',
            clear: true,
            timeout: 12
          }
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
