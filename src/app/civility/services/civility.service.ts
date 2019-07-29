import { Injectable } from '@angular/core';

import { normalize } from 'normalizr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Civility, civilitySchema } from '@app/civility/models/civility';
import { HttpService } from '@app/core/services/http.service';
import { NormalizedData } from '@app/shared/models/normalized.model';

@Injectable({
  providedIn: 'root'
})
export class CivilityService {
  private path = '/civilities';

  public constructor(private httpService: HttpService) {}
  public loadCivilities(): Observable<NormalizedData> {
    return this.httpService
      .getPublic<Civility[]>(this.path)
      .pipe(map(res => normalize(res, [civilitySchema])));
  }

  public updateCivility(data: any): Observable<NormalizedData> {
    return this.httpService
      .put<Civility>(`${this.path}/${data.id}`, data.civility)
      .pipe(map(res => normalize(res, civilitySchema)));
  }

  public addCivility(civility: any): Observable<NormalizedData> {
    return this.httpService
      .post<Civility>(this.path, civility)
      .pipe(map(res => normalize(res, civilitySchema)));
  }

  public deleteCivility(civility: Civility): Observable<number | undefined> {
    return this.httpService
      .delete(`${this.path}/${civility.id}`)
      .pipe(map(() => civility.id));
  }
}
