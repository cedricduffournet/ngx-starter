import { reducer } from '@app/core/state/reducers/layout.reducer';
import * as fromLayout from '@app/core/state/reducers/layout.reducer';

import { LayoutCoreActions } from '@app/core/state/actions';

describe('LayoutReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('TOGGLE_MENU', () => {
    it('should set showNavBar to true', () => {
      const action = LayoutCoreActions.toggleMenu();
      const result = reducer(fromLayout.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });

    it('should set showNavBar to false', () => {
      const action = LayoutCoreActions.toggleMenu();
      const result = reducer(
        {
          ...fromLayout.INITIAL_STATE,
          showSidenav: true
        },
        action
      );

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getShowSidenav', () => {
      it('shoud retrieve ShowSidenav (true)', () => {
        const result = fromLayout.getShowSidenav({
          ...fromLayout.INITIAL_STATE,
          showSidenav: true
        });

        expect(result).toMatchSnapshot();
      });
    });

    describe('getMenu', () => {
      it('shoud retrieve menu', () => {
        const result = fromLayout.getMenu({
          ...fromLayout.INITIAL_STATE,
          menu: [
            {
              name: 'Menu 1',
              route: ['route1'],
              roles: ['ROLE1', 'ROLE2'],
              cssClass: 'cssClassMenu1',
              faIcon: ['icon1, icone2']
            },
            {
              name: 'Menu 2',
              route: ['route2'],
              roles: ['ROLE3', 'ROLE4'],
              cssClass: 'cssClassMenu2',
              faIcon: ['icon3, icone4']
            }
          ]
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
