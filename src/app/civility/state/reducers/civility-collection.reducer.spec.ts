import { reducer } from '@app/civility/state/reducers/civility-collection.reducer';
import * as fromCivilities from '@app/civility/state/reducers/civility-collection.reducer';

import {
  CivilityListViewActions,
  CivilityAddModalActions,
  CivilityDeleteModalActions,
  CivilityApiActions
} from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';

describe('CivilityCollectionReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD', () => {
    it('should set loading to true', () => {
      const action = CivilityListViewActions.loadCivilities();
      const result = reducer(fromCivilities.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_SUCCESS ', () => {
    it('should set loading to false, loaded to true and set civility ids [1, 2]', () => {
      const initialState = {
        ...fromCivilities.INITIAL_STATE,
        loading: true
      };

      const civilities = {
        entities: {
          1: {
            code: 'Mr',
            name: 'Mister'
          },
          2: {
            code: 'Mr',
            name: 'Miss'
          }
        },
        result: [1, 2]
      };
      const action = CivilityApiActions.loadCivilitySuccess({
        civilities
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_FAILURE ', () => {
    const initialState = {
      ...fromCivilities.INITIAL_STATE,
      loading: true
    };

    it('should set loading to false, loaded to false', () => {
      const error = {
        message: 'error'
      };
      const action = CivilityApiActions.loadCivilityFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD', () => {
    it('should set adding to true on CivilityAddModalActions.addCivility', () => {
      const civility = {
        code: 'AddCode',
        name: 'AddName'
      } as Civility;
      const action = CivilityAddModalActions.addCivility({
        civility
      });
      const result = reducer(fromCivilities.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_SUCCESS', () => {
    it('should set adding to false, added to true and add new civility (3) to ids', () => {
      const initialState = {
        ...fromCivilities.INITIAL_STATE,
        adding: true,
        ids: [1, 2]
      };
      const civility = {
        entities: {
          3: {
            code: 'AddCode',
            name: 'AddName'
          }
        },
        result: 3
      };
      const action = CivilityApiActions.addCivilitySuccess({
        civility
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('ADD_FAILURE & SHOW_MODAL_ADD', () => {
    const initialState = {
      ...fromCivilities.INITIAL_STATE,
      adding: true,
      added: true
    };

    it('should set adding to false, added to false', () => {
      const error = {
        message: 'error'
      };
      const action = CivilityApiActions.addCivilityFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set adding to false on CivilityListViewActions.showAddCivilityModal', () => {
      const action = CivilityListViewActions.showAddCivilityModal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE', () => {
    it('should set deleting to true', () => {
      const civility = {
        id: 1,
        code: 'RemoveCode',
        name: 'RemoveName'
      };
      const action = CivilityDeleteModalActions.deleteCivility({
        civility
      });
      const result = reducer(fromCivilities.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_SUCCESS', () => {
    const initialState = {
      ...fromCivilities.INITIAL_STATE,
      removing: true,
      ids: [1, 2]
    };

    it('should set deleting to false, deleted to true and remove civility (1) form ids', () => {
      const id = 1;

      const action = CivilityApiActions.deleteCivilitySuccess({
        id
      });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DELETE_FAILURE & SHOW_MODAL_DELETE', () => {
    const initialState = {
      ...fromCivilities.INITIAL_STATE,
      removing: true,
      removed: true
    };

    it('should set removing to false, remove to false', () => {
      const error = {
        message: 'error'
      };
      const action = CivilityApiActions.deleteCivilityFailure({ error });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });

    it('should set removing to false, remove to false on CivilityListViewActions.showDeleteCivilityModal', () => {
      const action = CivilityListViewActions.showDeleteCivilityModal();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getIds', () => {
      it('should retrieve ids [1,2,3]', () => {
        const result = fromCivilities.getIds({
          ...fromCivilities.INITIAL_STATE,
          ids: [1, 2, 3]
        });
        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleting', () => {
      it('should retrieve removing false', () => {
        const result = fromCivilities.getDeleting({
          ...fromCivilities.INITIAL_STATE,
          deleting: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve removing true', () => {
        const result = fromCivilities.getDeleting({
          ...fromCivilities.INITIAL_STATE,
          deleting: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getDeleted', () => {
      it('should retrieve deleted false', () => {
        const result = fromCivilities.getDeleted({
          ...fromCivilities.INITIAL_STATE,
          deleted: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve deleted true', () => {
        const result = fromCivilities.getDeleted({
          ...fromCivilities.INITIAL_STATE,
          deleted: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdding', () => {
      it('should retrieve adding false', () => {
        const result = fromCivilities.getAdding({
          ...fromCivilities.INITIAL_STATE,
          adding: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve adding true', () => {
        const result = fromCivilities.getAdding({
          ...fromCivilities.INITIAL_STATE,
          adding: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getAdded', () => {
      it('should retrieve added false', () => {
        const result = fromCivilities.getAdded({
          ...fromCivilities.INITIAL_STATE,
          added: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve added true', () => {
        const result = fromCivilities.getAdded({
          ...fromCivilities.INITIAL_STATE,
          added: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoaded', () => {
      it('should retrieve loaded false', () => {
        const result = fromCivilities.getLoaded({
          ...fromCivilities.INITIAL_STATE,
          loaded: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loaded true', () => {
        const result = fromCivilities.getLoaded({
          ...fromCivilities.INITIAL_STATE,
          loaded: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getLoading', () => {
      it('should retrieve loading false', () => {
        const result = fromCivilities.getLoading({
          ...fromCivilities.INITIAL_STATE,
          loading: false
        });

        expect(result).toMatchSnapshot();
      });

      it('should retrieve loading true', () => {
        const result = fromCivilities.getLoading({
          ...fromCivilities.INITIAL_STATE,
          loading: true
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
