import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import {
  ToasterConfig,
  ToasterService
} from 'angular2-toaster/angular2-toaster';

import {
  defaultConfig,
  ToasterParams
} from '@app/core/containers/toaster/toaster.model';
import * as fromRoot from '@app/core/state/reducers';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html'
})
export class ToasterComponent implements OnInit {
  public toasterConfig: ToasterConfig = new ToasterConfig(defaultConfig);

  public toasterParams$: Observable<ToasterParams>;

  public constructor(
    private store: Store<fromRoot.State>,
    public toaster: ToasterService
  ) {}

  ngOnInit() {
    this.toasterParams$ = this.store.pipe(select(fromRoot.getToasterParams));

    this.toasterParams$.pipe(skip(1)).subscribe((params: ToasterParams) => {
      if (params.timeout && params.timeout > 0) {
        this.toasterConfig.timeout = params.timeout;
      }
      if (params.clear) {
        this.toaster.clear();
      }
      this.toaster.pop(params.type, params.title, params.body);
    });
  }
}
