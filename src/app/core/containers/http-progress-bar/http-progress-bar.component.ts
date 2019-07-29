import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/core/state/reducers';

@Component({
  selector: 'app-http-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./http-progress-bar.component.scss'],
  template: `
    <div class="progress" *ngIf="processing$ | async">
      <div class="indeterminate"></div>
    </div>
  `
})
export class HttpProgressBarComponent {
  public processing$: Observable<boolean>;

  public constructor(private store: Store<fromRoot.State>) {
    this.processing$ = this.store.pipe(select(fromRoot.isHttpProcessing));
  }
}
