import { TestBed, async } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpService } from '@app/core/services';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('HttpService', () => {
  let service: HttpService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });

    http = TestBed.get(HttpClient);
    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should call http get with api url', async(() => {
    service
      .get('/test')
      .subscribe(response => expect(response).toBe('response'));

    const req = httpMock.expectOne(
      r =>
        r.headers.has('Content-Type') &&
        r.headers.get('Content-Type') === 'application/json' &&
        r.headers.has('Accept') &&
        r.headers.get('Accept') === 'application/json' &&
        r.url === `${service.getApiPath()}/test${service.getApiSuffix()}` &&
        r.method === 'GET'
    );

    req.flush('response');

    httpMock.verify();
  }));

  it('should call http get with api public url', async(() => {
    service
      .getPublic('/test')
      .subscribe(response => expect(response).toBe('response'));

    const req = httpMock.expectOne(
      r =>
        r.url ===
          `${service.getApiPublicPath()}/test${service.getApiSuffix()}` &&
        r.method === 'GET'
    );

    req.flush('response');

    httpMock.verify();
  }));

  it('should call http post with api url', async(() => {
    service
      .post<any>('/test', { testvalue: 'test' })
      .subscribe(response => expect(response).toBe('response'));

    const req = httpMock.expectOne(
      r =>
        r.url === `${service.getApiPath()}/test${service.getApiSuffix()}` &&
        r.method === 'POST'
    );
    expect(req.request.body).toEqual({ testvalue: 'test' });
    req.flush('response');

    httpMock.verify();
  }));

  it('should call http post with public api url', async(() => {
    service
      .postPublic<any>('/test', { testvalue: 'test' })
      .subscribe(response => expect(response).toBe('response'));

    const req = httpMock.expectOne(
      r =>
        r.url ===
          `${service.getApiPublicPath()}/test${service.getApiSuffix()}` &&
        r.method === 'POST'
    );
    expect(req.request.body).toEqual({ testvalue: 'test' });
    req.flush('response');

    httpMock.verify();
  }));

  it('should call http post with host api url', async(() => {
    service
      .postHost<any>('/test', { testvalue: 'test' })
      .subscribe(response => expect(response).toBe('response'));

    const req = httpMock.expectOne(
      r =>
        r.url === `${service.getApiHost()}/test${service.getApiSuffix()}` &&
        r.method === 'POST'
    );
    expect(req.request.body).toEqual({ testvalue: 'test' });
    req.flush('response');

    httpMock.verify();
  }));

  it('should call http put', async(() => {
    service
      .put<any>('/test/1', { testvalue: 'test' })
      .subscribe(response => expect(response).toBe('response'));

    const req = httpMock.expectOne(
      r =>
        r.url === `${service.getApiPath()}/test/1${service.getApiSuffix()}` &&
        r.method === 'PUT'
    );
    expect(req.request.body).toEqual({ testvalue: 'test' });
    req.flush('response');

    httpMock.verify();
  }));

  it('should call http delete', async(() => {
    service.delete('/test/1').subscribe(response => expect(response).toBe(1));

    const req = httpMock.expectOne(
      r =>
        r.url === `${service.getApiPath()}/test/1${service.getApiSuffix()}` &&
        r.method === 'DELETE'
    );
    req.flush(1);

    httpMock.verify();
  }));
});
