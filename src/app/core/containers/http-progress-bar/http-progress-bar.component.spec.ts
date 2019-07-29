import { TestBed, ComponentFixture } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { HttpProgressBarComponent } from '@app/core/containers';
import * as fromRoot from '@app/core/state/reducers';

describe('HttpProgressBar', () => {
  let fixture: ComponentFixture<HttpProgressBarComponent>;
  let component: HttpProgressBarComponent;
  let store: MockStore<fromRoot.State>;
  let processing: MemoizedSelector<fromRoot.State, boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpProgressBarComponent],
      providers: [provideMockStore()]
    });
    fixture = TestBed.createComponent(HttpProgressBarComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    processing = store.overrideSelector(fromRoot.isHttpProcessing, false);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display progress bar', () => {
    processing.setResult(true);

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
