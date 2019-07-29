import { TestBed, ComponentFixture } from '@angular/core/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { ToasterComponent, ToasterParams } from '@app/core/containers';
import * as fromToaster from '@app/core/state/reducers/toaster.reducer';
import * as fromRoot from '@app/core/state/reducers';

describe('ToasterComponent', () => {
  let fixture: ComponentFixture<ToasterComponent>;
  let component: ToasterComponent;
  let store: MockStore<fromRoot.State>;
  let params: MemoizedSelector<fromRoot.State, ToasterParams>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToasterModule.forRoot()],
      declarations: [ToasterComponent],
      providers: [provideMockStore()]
    });
    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    params = store.overrideSelector(
      fromRoot.getToasterParams,
      fromToaster.INITIAL_STATE.params
    );
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call toaster pop', () => {
    spyOn(component.toaster, 'pop');
    fixture.detectChanges();
    params.setResult({
      title: 'test title',
      type: 'success',
      body: 'test body'
    });
    store.setState({} as any);
    expect(component.toaster.pop).toHaveBeenCalledWith(
      'success',
      'test title',
      'test body'
    );
  });

  it('should change timeout toaster config ', () => {
    fixture.detectChanges();
    params.setResult({
      title: 'test title',
      type: 'success',
      body: 'test body',
      timeout: 1000
    });
    store.setState({} as any);
    expect(component.toasterConfig.timeout).toBe(1000);
  });

  it('should clear toaster ', () => {
    spyOn(component.toaster, 'clear');
    fixture.detectChanges();
    params.setResult({
      title: 'test title',
      type: 'success',
      body: 'test body',
      clear: true
    });
    store.setState({} as any);
    expect(component.toaster.clear).toHaveBeenCalled();
  });
});
