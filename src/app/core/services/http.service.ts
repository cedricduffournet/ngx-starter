import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getApiHost() {
    return environment.apiHost;
  }

  getApiBasePath() {
    return environment.apiBasePath;
  }

  getApiPublicBasePath() {
    return environment.apiPublicBasePath;
  }

  getApiSuffix() {
    return environment.apiSuffix;
  }

  getApiPath() {
    return `${this.getApiHost()}${this.getApiBasePath()}`;
  }

  getApiPublicPath() {
    return `${this.getApiHost()}${this.getApiPublicBasePath()}`;
  }

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(
      `${this.getApiPath()}${url}${this.getApiSuffix()}`,
      { headers: this.headers, params }
    );
  }

  getPublic<T>(
    url: string,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http.get<T>(
      `${this.getApiPublicPath()}${url}${this.getApiSuffix()}`,
      { headers: this.headers, params }
    );
  }

  post<T>(url: string, body: any | null): Observable<T> {
    return this.http.post<T>(
      `${this.getApiPath()}${url}${this.getApiSuffix()}`,
      body,
      { headers: this.headers }
    );
  }

  postPublic<T>(url: string, body: any | null): Observable<T> {
    return this.http.post<T>(
      `${this.getApiPublicPath()}${url}${this.getApiSuffix()}`,
      body,
      { headers: this.headers }
    );
  }

  postHost<T>(url: string, body: any | null): Observable<T> {
    return this.http.post<T>(`${this.getApiHost()}${url}`, body, {
      headers: this.headers
    });
  }

  put<T>(url: string, body: any | null): Observable<T> {
    return this.http.put<T>(
      `${this.getApiPath()}${url}${this.getApiSuffix()}`,
      body,
      { headers: this.headers }
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(
      `${this.getApiPath()}${url}${this.getApiSuffix()}`,
      { headers: this.headers }
    );
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }
}
