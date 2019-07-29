import * as fromRoot from '@app/core/state/reducers';

describe('CivilityReducer ', () => {
  const initialState: fromRoot.State = {
    layout: {
      showSidenav: true,
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
    },
    toaster: {
      params: {
        type: 'success',
        title: 'title',
        body: 'body',
        clear: true,
        timeout: 12
      }
    },
    http: {
      processing: true,
      processList: [true, true],
      url: 'http://www.test.com'
    },
    router: {
      state: {
        url: '/test.com',
        params: {
          param1: 'param1'
        },
        data: {
          title: 'test title',
          previousLink: ['previous']
        },
        queryParams: {
          qParam1: 'qParam1'
        }
      },
      navigationId: 1
    }
  };

  describe('Selectors', () => {
    describe('getPageTitle', () => {
      it('should return page title', () => {
        expect(fromRoot.getPageTitle.projector(initialState.router)).toBe(
          'test title'
        );
      });

      it('should return empty string if page title is not set', () => {
        expect(
          fromRoot.getPageTitle.projector({
            state: {}
          })
        ).toBe('');
      });
    });

    describe('getPreviousLink', () => {
      it('should return previsous page link', () => {
        expect(
          fromRoot.getPreviousLink.projector(initialState.router)
        ).toStrictEqual(['previous']);
      });

      it('should return null preivousLink is not set', () => {
        expect(
          fromRoot.getPreviousLink.projector({
            state: {}
          })
        ).toBe(null);
      });
    });

    describe('getShowSidenav', () => {
      it('should return if navbar should be displayed', () => {
        expect(fromRoot.getShowSidenav.projector(initialState.layout)).toBe(
          true
        );
      });
    });

    describe('getMenu', () => {
      it('should menu', () => {
        expect(fromRoot.getMenu.projector(initialState.layout)).toStrictEqual([
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
        ]);
      });
    });

    describe('getUserMenu', () => {
      it('should return menu according to user roles', () => {
        expect(
          fromRoot.getUserMenu.projector(initialState.layout.menu, {
            roles: ['ROLE1']
          })
        ).toStrictEqual([
          {
            name: 'Menu 1',
            route: ['route1'],
            roles: ['ROLE1', 'ROLE2'],
            cssClass: 'cssClassMenu1',
            faIcon: ['icon1, icone2']
          }
        ]);
      });
      it('should empty array as menu if user is not collecter', () => {
        expect(
          fromRoot.getUserMenu.projector(initialState.layout.menu, null)
        ).toStrictEqual([]);
      });
    });

    describe('getToasterParams', () => {
      it('should return toaster params', () => {
        expect(
          fromRoot.getToasterParams.projector(initialState.toaster)
        ).toStrictEqual({
          type: 'success',
          title: 'title',
          body: 'body',
          clear: true,
          timeout: 12
        });
      });
    });

    describe('getHttpProcessList', () => {
      it('should return http process list', () => {
        expect(
          fromRoot.getHttpProcessList.projector(initialState.http)
        ).toStrictEqual([true, true]);
      });
    });

    describe('isHttpProcessing', () => {
      it('should return is  http call in progress', () => {
        expect(
          fromRoot.isHttpProcessing.projector(initialState.http.processList)
        ).toStrictEqual(true);
      });
    });
  });
});
