import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import * as fromRoot from '@app/core/state/reducers';
import { LayoutCoreActions } from '@app/core/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';
import { AuthActions } from '@app/authentication/state/actions';
import { ShellModule } from '@app/shell';
import { AppComponent } from '@app/app.component';

@Component({ selector: 'app-toaster', template: '' })
class ToasterStubComponent {}

@Component({ selector: 'app-http-progress-bar', template: '' })
class HttpProgressStubComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore<fromRoot.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ShellModule, TranslateModule.forRoot()],
      declarations: [
        AppComponent,
        ToasterStubComponent,
        HttpProgressStubComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: fromAuth.getLoggedUser,
              value: {
                firstname: 'firstname'
              }
            }
          ]
        })
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a AuthActions.showLogoutModal action on logout', () => {
    fixture.detectChanges();

    const action = AuthActions.showLogoutModal();
    const navbar = fixture.debugElement.query(By.css('app-navbar'));

    navbar.triggerEventHandler('logout', {});

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a ALayoutCoreActions.toggleMenu action on toggleMenu', () => {
    fixture.detectChanges();

    const action = LayoutCoreActions.toggleMenu();
    const navbar = fixture.debugElement.query(By.css('app-navbar'));

    navbar.triggerEventHandler('toggleMenu', {});

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
