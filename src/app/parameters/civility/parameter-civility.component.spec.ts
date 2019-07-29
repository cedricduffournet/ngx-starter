import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ParameterCivilityComponent } from '@app/parameters/civility';

@Component({ selector: 'app-civility-list-view', template: '' })
class ListCivilityViewStubComponent {}

describe('ParameterCivilityComponent', () => {
  let fixture: ComponentFixture<ParameterCivilityComponent>;
  let component: ParameterCivilityComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterCivilityComponent, ListCivilityViewStubComponent]
    });

    fixture = TestBed.createComponent(ParameterCivilityComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
