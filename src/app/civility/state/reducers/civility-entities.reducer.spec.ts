import { reducer } from '@app/civility/state/reducers/civility-entities.reducer';
import * as fromCivilities from '@app/civility/state/reducers/civility-entities.reducer';

import {
  CivilityListViewActions,
  CivilityUpdateModalActions,
  CivilityApiActions
} from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';

describe('CivilitiyEntitiesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should return state with civility entities', () => {
      const civilities = {
        entities: {
          civilities: {
            1: {
              code: 'Mr',
              name: 'Mister'
            },
            2: {
              code: 'Mr',
              name: 'Miss'
            }
          }
        },
        result: [1, 2]
      };
      const action = CivilityApiActions.loadCivilitySuccess({
        civilities
      });
      const result = reducer(fromCivilities.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE', () => {
    const id = 1;
    const civility = {
      code: 'MrUpdated',
      name: 'MisterUpdated'
    } as Civility;
    const data = { id, civility };

    it('should set updating to true', () => {
      const action = CivilityUpdateModalActions.updateCivility({ data });
      const result = reducer(fromCivilities.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_SUCCESS', () => {
    it('should update civility id 1, upated should be true and updating false', () => {
      const civilities = {
        1: {
          id: 1,
          code: 'Mr',
          name: 'Mister'
        },
        2: {
          id: 2,
          code: 'Mr',
          name: 'Miss'
        }
      };
      const initialState = {
        ...fromCivilities.INITIAL_STATE,
        entities: civilities
      };

      const civility = {
        entities: {
          civilities: {
            1: {
              code: 'MrUpdated',
              name: 'MisterUpdated'
            }
          }
        },
        result: 1
      };
      const action = CivilityApiActions.updateCivilitySuccess({ civility });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAILURE & SHOW_MODAL_UPDATE', () => {
    const initialState = {
      ...fromCivilities.INITIAL_STATE,
      updating: true,
      updated: true,
      entities: {
        1: {
          id: 1,
          code: 'Mr',
          name: 'Mister'
        }
      }
    };

    it('should set updating to false', () => {
      const error = {
        message: 'error'
      };
      const action = CivilityApiActions.updateCivilityFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should set updating to false, updated to false when show modal', () => {
      const action = CivilityListViewActions.showUpdateCivilityModal();
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    const civilities = {
      1: {
        id: 1,
        code: 'Mr',
        name: 'Mister'
      },
      2: {
        id: 2,
        code: 'Mr',
        name: 'Miss'
      }
    };
    const initialState = {
      ...fromCivilities.INITIAL_STATE,
      entities: civilities
    };

    const civility = {
      entities: {
        civilities: {
          3: {
            code: 'AddCode',
            name: 'AddName'
          }
        }
      },
      result: 3
    };

    it('should add a new civility id 3', () => {
      const action = CivilityApiActions.addCivilitySuccess({ civility });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    const civilities = {
      1: {
        id: 1,
        code: 'Mr',
        name: 'Mister'
      },
      2: {
        id: 2,
        code: 'Mr',
        name: 'Miss'
      }
    };
    const initialState = {
      ...fromCivilities.INITIAL_STATE,
      entities: civilities
    };

    const id = 1;

    it('should set selected civility (id 1)', () => {
      const action = CivilityListViewActions.selectCivility({ id });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getEntities', () => {
      it('should return entities', () => {
        const result = fromCivilities.getEntities({
          ...fromCivilities.INITIAL_STATE,
          entities: {
            1: {
              id: 1,
              code: 'Mr',
              name: 'Mister'
            },
            2: {
              id: 2,
              code: 'Mr',
              name: 'Miss'
            }
          }
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getSelectedId', () => {
      it('should return selected id (1)', () => {
        const result = fromCivilities.getSelectedId({
          ...fromCivilities.INITIAL_STATE,
          selectedId: 1
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdating', () => {
      it('should return updating true', () => {
        const result = fromCivilities.getUpdating({
          ...fromCivilities.INITIAL_STATE,
          updating: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getUpdated', () => {
      it('should return updated true', () => {
        const result = fromCivilities.getUpdated({
          ...fromCivilities.INITIAL_STATE,
          updated: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
