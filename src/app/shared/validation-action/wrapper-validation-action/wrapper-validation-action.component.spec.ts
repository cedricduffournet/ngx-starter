import { TestBed, ComponentFixture } from '@angular/core/testing';

import { WrapperValidationActionComponent } from '@app/shared/validation-action/wrapper-validation-action';

describe('WrapperValidationActionComponent', () => {
  let fixture: ComponentFixture<WrapperValidationActionComponent>;
  let component: WrapperValidationActionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrapperValidationActionComponent]
    });
    fixture = TestBed.createComponent(WrapperValidationActionComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
