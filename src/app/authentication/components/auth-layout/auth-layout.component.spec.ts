import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AuthLayoutComponent } from '@app/authentication/components';

@Component({ selector: 'app-lang-switcher', template: '' })
class LangSwitcherStubComponent {}

@Component({ selector: 'app-logo', template: '' })
class LogoStubComponent {}

describe('AuthLayout', () => {
  let fixture: ComponentFixture<AuthLayoutComponent>;
  let component: AuthLayoutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLayoutComponent,
        LangSwitcherStubComponent,
        LogoStubComponent
      ]
    });

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display title 1', () => {
    component.title = 'test';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display title2', () => {
    component.title2 = 'title 2';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
