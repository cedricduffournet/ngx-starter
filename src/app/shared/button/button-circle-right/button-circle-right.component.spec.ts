import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ButtonCircleRightComponent } from '@app/shared/button/button-circle-right';

describe('ButtonCircleRightComponent', () => {
  let fixture: ComponentFixture<ButtonCircleRightComponent>;
  let component: ButtonCircleRightComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCircleRightComponent]
    });

    fixture = TestBed.createComponent(ButtonCircleRightComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display label', () => {
    component.label = 'test label';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display button with danger', () => {
    component.type = 'danger';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
