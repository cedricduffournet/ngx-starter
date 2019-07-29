import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';
import { normalize } from 'normalizr';

import { CivilityService } from '@app/civility/services';
import { civilitySchema, Civility } from '@app/civility/models/civility';
import { HttpService } from '@app/core/services/http.service';

describe('CivilityService', () => {
  let service: CivilityService;
  let http: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            getPublic: jest.fn(),
            put: jest.fn(),
            post: jest.fn(),
            delete: jest.fn()
          }
        },
        CivilityService
      ]
    });

    service = TestBed.get(CivilityService);
    http = TestBed.get(HttpService);
  });

  it('should retrieve civility collection', () => {
    const civilities = [
      {
        id: 1,
        code: 'code 1',
        name: 'name 1'
      },
      {
        id: 1,
        code: 'code 2',
        name: 'name 2'
      }
    ];
    const civilitiesNormalized = normalize(civilities, [civilitySchema]);
    const response = cold('-a|', { a: civilities });
    const expected = cold('-b|', { b: civilitiesNormalized });
    http.getPublic = jest.fn(() => response);

    expect(service.loadCivilities()).toBeObservable(expected);
    expect(http.getPublic).toHaveBeenCalledWith('/civilities');
  });

  it('should update civility, and return civility updated', () => {
    const civility = {
      code: 'code 1',
      name: 'name 1'
    };
    const id = 1;
    const data = {
      id,
      civility: {
        code: civility.code,
        name: civility.name
      }
    };
    const civilitiyNormalized = normalize(
      { id, code: civility.code, name: civility.name },
      civilitySchema
    );

    const response = cold('-a|', {
      a: { id, code: civility.code, name: civility.name }
    });
    const expected = cold('-b|', { b: civilitiyNormalized });
    http.put = jest.fn(() => response);

    expect(service.updateCivility(data)).toBeObservable(expected);
    expect(http.put).toHaveBeenCalledWith(`/civilities/${id}`, data.civility);
  });

  it('should add civility, and return civility added', () => {
    const civility = {
      code: 'code 1',
      name: 'name 1'
    } as Civility;

    const civilitiyNormalized = normalize(civility, civilitySchema);

    const response = cold('-a|', { a: civility });
    const expected = cold('-b|', { b: civilitiyNormalized });
    http.post = jest.fn(() => response);

    expect(service.addCivility(civility)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(`/civilities`, civility);
  });

  it('should remove civility, and return remove id', () => {
    const civility = {
      id: 1,
      code: 'code 1',
      name: 'name 1'
    };

    const response = cold('-a|', { a: {} });
    const expected = cold('-b|', { b: civility.id });
    http.delete = jest.fn(() => response);

    expect(service.deleteCivility(civility)).toBeObservable(expected);
    expect(http.delete).toHaveBeenCalledWith(`/civilities/${civility.id}`);
  });
});
