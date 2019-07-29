import { TestBed } from '@angular/core/testing';

import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { CivilityEffects } from '@app/civility/state/effects';
import { CivilityService } from '@app/civility/services';

import {
  CivilityAddModalActions,
  CivilityUpdateModalActions,
  CivilityListViewActions,
  CivilityApiActions,
  CivilityDeleteModalActions
} from '@app/civility/state/actions';
import { ToasterActions } from '@app/core/state/actions';

import {
  CivilityUpdateModalComponent,
  CivilityAddModalComponent,
  CivilityDeleteModalComponent
} from '@app/civility/containers';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';
import { RegisterViewActions } from '@app/authentication/state/actions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Civility } from '@app/civility/models/civility';

describe('CivilityEffects', () => {
  let effects: CivilityEffects;
  let actions$: Observable<any>;
  let ts: TranslateService;
  let service: any;
  let modal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CivilityEffects,
        provideMockActions(() => actions$),
        {
          provide: CivilityService,
          useValue: {
            loadCivilities: jest.fn(),
            addCivility: jest.fn(),
            updateCivility: jest.fn(),
            deleteCivility: jest.fn()
          }
        },
        {
          provide: TranslateService,
          useValue: { instant: jest.fn() }
        },
        {
          provide: BsModalService,
          useValue: { show: jest.fn() }
        },
        provideMockStore()
      ]
    });
    effects = TestBed.get(CivilityEffects);
    service = TestBed.get(CivilityService);
    ts = TestBed.get(TranslateService);
    modal = TestBed.get(BsModalService);
    actions$ = TestBed.get(Actions);
    spyOn(modal, 'show').and.callThrough();
  });

  describe('loadCivilities$', () => {
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

    function loadCivilitySuccess(
      action:
        | typeof CivilityListViewActions.loadCivilities
        | typeof RegisterViewActions.loadCivilities
    ) {
      const createAction = action();
      const success = CivilityApiActions.loadCivilitySuccess({
        civilities
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-a|', { a: civilities });
      const expected = cold('--b', { b: success });
      service.loadCivilities = jest.fn(() => response);

      expect(effects.loadCivilities$).toBeObservable(expected);
    }

    function loadCivilityFailure(
      action:
        | typeof CivilityListViewActions.loadCivilities
        | typeof RegisterViewActions.loadCivilities
    ) {
      const createAction = action();
      const fail = CivilityApiActions.loadCivilityFailure({
        error: 'Error loading'
      });

      actions$ = hot('-a-', { a: createAction });
      const response = cold('-#|', {}, { error: 'Error loading' });
      const expected = cold('--b', { b: fail });
      service.loadCivilities = jest.fn(() => response);

      expect(effects.loadCivilities$).toBeObservable(expected);
    }

    it('should return a loadCivilitySuccess, when CivilityListViewActions.loadCivilities, with civilities, on success', () => {
      const action = CivilityListViewActions.loadCivilities;
      loadCivilitySuccess(action);
    });

    it('should return a loadCivilitySuccess, when RegisterViewActions.loadCivilities, with civilities, on success', () => {
      const action = RegisterViewActions.loadCivilities;
      loadCivilitySuccess(action);
    });

    it('should return a loadCivilityFailure, when CivilityListViewActions.loadCivilities on error', () => {
      const action = CivilityListViewActions.loadCivilities;
      loadCivilityFailure(action);
    });

    it('should return a loadCivilityFailure, when RegisterViewActions.loadCivilities on error', () => {
      const action = RegisterViewActions.loadCivilities;
      loadCivilityFailure(action);
    });
  });

  describe('addCivilityModal$', () => {
    it('should open a modal with AddCivilityModalComponent component', (done: any) => {
      const action = CivilityListViewActions.showAddCivilityModal();

      actions$ = of(action);

      effects.addCivilityModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          CivilityAddModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('addCivility$', () => {
    const civility = {
      code: 'Mr',
      name: 'Mister'
    } as Civility;

    it('should return a addCivilitySuccess with added civility on success', () => {
      const civilitySuccess = {
        entities: {
          1: {
            id: 1,
            code: 'Mr',
            name: 'Mister'
          }
        },
        result: 1
      };

      const action = CivilityAddModalActions.addCivility({ civility });
      const success = CivilityApiActions.addCivilitySuccess({
        civility: civilitySuccess
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: civilitySuccess });
      const expected = cold('--b', { b: success });
      service.addCivility = jest.fn(() => response);

      expect(effects.addCivility$).toBeObservable(expected);
    });

    it('should return a addCivilityFailure on error', () => {
      const action = CivilityAddModalActions.addCivility({ civility });
      const fail = CivilityApiActions.addCivilityFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.addCivility = jest.fn(() => response);

      expect(effects.addCivility$).toBeObservable(expected);
    });
  });

  describe('addSuccessCivility', () => {
    it('should return an ToasterActions.pop when civility added success', () => {
      const civilitySuccess = {
        entities: {
          1: {
            code: 'Mr',
            name: 'Mister'
          }
        },
        result: 1
      };
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };
      const action = CivilityApiActions.addCivilitySuccess({
        civility: civilitySuccess
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.addSuccessCivility$).toBeObservable(expected);
    });
  });

  describe('updateCivilityModal$', () => {
    it('should open a modal with UpdateCivilityModalComponent component', (done: any) => {
      const action = CivilityListViewActions.showUpdateCivilityModal();

      actions$ = of(action);

      effects.updateCivilityModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          CivilityUpdateModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('updateCivility$', () => {
    const civility = {
      code: 'MrUpdated',
      name: 'MisterUpdated'
    } as Civility;

    const id = 1;

    it('should return a updateCivilitySuccess with updated civility on success', () => {
      const civilitySuccess = {
        entities: {
          1: {
            code: 'Mr',
            name: 'Mister'
          }
        },
        result: 1
      };

      const action = CivilityUpdateModalActions.updateCivility({
        data: { id, civility }
      });
      const success = CivilityApiActions.updateCivilitySuccess({
        civility: civilitySuccess
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: civilitySuccess });
      const expected = cold('--b', { b: success });
      service.updateCivility = jest.fn(() => response);

      expect(effects.updateCivility$).toBeObservable(expected);
    });

    it('should return a addCivilityFailure on error', () => {
      const action = CivilityUpdateModalActions.updateCivility({
        data: { id, civility }
      });
      const fail = CivilityApiActions.updateCivilityFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.updateCivility = jest.fn(() => response);

      expect(effects.updateCivility$).toBeObservable(expected);
    });
  });

  describe('updateSuccessCivility', () => {
    it('should return an ToasterActions.pop when civility update success', () => {
      const civilitySuccess = {
        entities: {
          1: {
            code: 'Mr',
            name: 'Mister'
          }
        },
        result: 1
      };
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };
      const action = CivilityApiActions.updateCivilitySuccess({
        civility: civilitySuccess
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.updateSuccessCivility$).toBeObservable(expected);
    });
  });

  describe('deleteCivilityModal$', () => {
    it('should open a modal with DeleteCivilityModalComponent component', (done: any) => {
      const action = CivilityListViewActions.showDeleteCivilityModal();

      actions$ = of(action);

      effects.deleteCivilityModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          CivilityDeleteModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('deleteCivility$', () => {
    const civility = {
      id: 1,
      code: 'Mr',
      name: 'Mister'
    };

    it('should return a deleteCivilitySuccess with delete civility id on success', () => {
      const idSuccess = { id: 1 };
      const action = CivilityDeleteModalActions.deleteCivility({ civility });
      const success = CivilityApiActions.deleteCivilitySuccess(idSuccess);

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: idSuccess });
      const expected = cold('--b', { b: success });
      service.deleteCivility = jest.fn(() => response);

      expect(effects.deleteCivility$).toBeObservable(expected);
    });

    it('should return a deleteCivilityFailure on error', () => {
      const action = CivilityDeleteModalActions.deleteCivility({ civility });
      const fail = CivilityApiActions.deleteCivilityFailure({
        error: 'Error loading'
      });
      const error = 'Error loading';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, { error });
      const expected = cold('--b', { b: fail });
      service.deleteCivility = jest.fn(() => response);

      expect(effects.deleteCivility$).toBeObservable(expected);
    });
  });

  describe('deleteSuccessCivility', () => {
    it('should return an ToasterActions.pop when civility delete success', () => {
      const id = 1;
      const toasterConfig = {
        type: 'success',
        title: 'translation',
        body: ''
      };

      const action = CivilityApiActions.deleteCivilitySuccess({
        id
      });

      ts.instant = jest.fn(() => 'translation');
      const pop = ToasterActions.pop({ params: toasterConfig });

      actions$ = hot('a', { a: action });
      const expected = cold('b', { b: pop });

      expect(effects.deleteSuccessCivility$).toBeObservable(expected);
    });
  });

  describe('failCivility$', () => {
    function civilityFailure(
      action:
        | typeof CivilityApiActions.loadCivilityFailure
        | typeof CivilityApiActions.updateCivilityFailure
        | typeof CivilityApiActions.addCivilityFailure
        | typeof CivilityApiActions.deleteCivilityFailure
    ) {
      const toasterConfig = {
        type: 'error',
        title: 'error',
        body: ''
      };
      const createAction = action({ error: { message: 'error' } });
      actions$ = hot('a', { a: createAction });

      const pop = ToasterActions.pop({ params: toasterConfig });
      const expected = cold('b', { b: pop });

      expect(effects.failCivility$).toBeObservable(expected);
    }

    it('should return an ToasterActions.pop when CivilityApiActions.loadCivilityFailure', () => {
      const action = CivilityApiActions.loadCivilityFailure;
      civilityFailure(action);
    });

    it('should return an ToasterActions.pop when CivilityApiActions.updateCivilityFailure', () => {
      const action = CivilityApiActions.updateCivilityFailure;
      civilityFailure(action);
    });

    it('should return an ToasterActions.pop when CivilityApiActions.addCivilityFailure', () => {
      const action = CivilityApiActions.addCivilityFailure;
      civilityFailure(action);
    });

    it('should return an ToasterActions.pop when CivilityApiActions.deleteCivilityFailure', () => {
      const action = CivilityApiActions.deleteCivilityFailure;
      civilityFailure(action);
    });
  });
});
