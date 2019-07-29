import * as fromCivilities from '@app/civility/state/reducers';
import { User } from '@app/user/models/User';

describe('CivilityReducer ', () => {
  const initialState: fromCivilities.CivilitiesState = {
    collection: {
      ids: [1, 2, 3],
      adding: true,
      added: true,
      deleting: true,
      deleted: true,
      loading: true,
      loaded: true
    },
    civilities: {
      entities: {
        1: {
          id: 1,
          code: 'Mr',
          name: 'Mister'
        },
        2: {
          id: 2,
          code: 'Mrs',
          name: 'Madam'
        },
        3: {
          id: 3,
          code: 'Code3',
          name: 'Name3'
        }
      },
      selectedId: 1,
      updating: true,
      updated: true
    }
  };

  describe('Selectors', () => {
    describe('getCivilityEntitiesState', () => {
      it('should return the civilities state', () => {
        expect(
          fromCivilities.getCivilityEntitiesState.projector(initialState)
        ).toStrictEqual({
          entities: {
            1: {
              id: 1,
              code: 'Mr',
              name: 'Mister'
            },
            2: {
              id: 2,
              code: 'Mrs',
              name: 'Madam'
            },
            3: {
              id: 3,
              code: 'Code3',
              name: 'Name3'
            }
          },
          selectedId: 1,
          updating: true,
          updated: true
        });
      });
    });

    describe('getCivilityEntities', () => {
      it('should return the civilities entities', () => {
        expect(
          fromCivilities.getCivilityEntities.projector(initialState.civilities)
        ).toStrictEqual({
          1: {
            id: 1,
            code: 'Mr',
            name: 'Mister'
          },
          2: {
            id: 2,
            code: 'Mrs',
            name: 'Madam'
          },
          3: {
            id: 3,
            code: 'Code3',
            name: 'Name3'
          }
        });
      });
    });

    describe('getCivilityEntitiesUpdating', () => {
      it('should return the civilities updating', () => {
        expect(
          fromCivilities.getCivilityEntitiesUpdating.projector(
            initialState.civilities
          )
        ).toBe(true);
      });
    });

    describe('getCivilityEntitiesUpdated', () => {
      it('should return the civilities updated', () => {
        expect(
          fromCivilities.getCivilityEntitiesUpdated.projector(
            initialState.civilities
          )
        ).toBe(true);
      });
    });

    describe('getCivilityCollectionState', () => {
      it('should return the collection state', () => {
        expect(
          fromCivilities.getCivilityCollectionState.projector(initialState)
        ).toStrictEqual({
          ids: [1, 2, 3],
          adding: true,
          added: true,
          deleting: true,
          deleted: true,
          loading: true,
          loaded: true
        });
      });
    });

    describe('getCivilityIds', () => {
      it('should return collection ids', () => {
        expect(
          fromCivilities.getCivilityIds.projector(initialState.collection)
        ).toStrictEqual([1, 2, 3]);
      });
    });

    describe('getCivilityCollectionAdding', () => {
      it('should return  if collection adding', () => {
        expect(
          fromCivilities.getCivilityCollectionAdding.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getCivilityCollectionAdded', () => {
      it('should return  if item in collection added', () => {
        expect(
          fromCivilities.getCivilityCollectionAdded.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getCivilityCollectionDeleting', () => {
      it('should return the if collection deleting', () => {
        expect(
          fromCivilities.getCivilityCollectionDeleting.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getCivilityCollectionDeleted', () => {
      it('should return the if item in collection deleted', () => {
        expect(
          fromCivilities.getCivilityCollectionDeleted.projector(
            initialState.collection
          )
        ).toBe(true);
      });
    });

    describe('getCivilities', () => {
      it('should return the civilities', () => {
        expect(
          fromCivilities.getCivilities.projector(
            initialState.civilities.entities,
            initialState.collection.ids
          )
        ).toStrictEqual([
          {
            id: 1,
            code: 'Mr',
            name: 'Mister'
          },
          {
            id: 2,
            code: 'Mrs',
            name: 'Madam'
          },
          {
            id: 3,
            code: 'Code3',
            name: 'Name3'
          }
        ]);
      });
    });

    describe('getSelectedCivilityId', () => {
      it('should return id of selected civility', () => {
        expect(
          fromCivilities.getSelectedCivilityId.projector(
            initialState.civilities
          )
        ).toBe(1);
      });
    });

    describe('getSelectedCivility', () => {
      it('should return selected civility', () => {
        expect(
          fromCivilities.getSelectedCivility.projector(
            initialState.civilities.entities,
            initialState.civilities.selectedId
          )
        ).toStrictEqual({
          id: 1,
          code: 'Mr',
          name: 'Mister'
        });
      });
    });

    describe('canUpdateCivility', () => {
      it('should return if can update civility', () => {
        expect(fromCivilities.canUpdateCivility.projector(true)).toBe(true);
      });
    });

    describe('canDeleteCivility', () => {
      it('should return if can delete civility', () => {
        expect(fromCivilities.canDeleteCivility.projector(true)).toBe(true);
      });
    });

    describe('canCreateCivility', () => {
      it('should return if can create civility', () => {
        expect(fromCivilities.canCreateCivility.projector(true)).toBe(true);
      });
    });

    describe('getCivilityAuthorization', () => {
      it('should return civility authorization', () => {
        expect(
          fromCivilities.getCivilityAuthorization.projector(true, true, false)
        ).toStrictEqual({
          update: true,
          delete: true,
          create: false
        });
      });
    });
  });
});
