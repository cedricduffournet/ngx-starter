import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ModalWrapperComponent } from '@app/shared/modal/modal-wrapper.component';

describe('ModalWrapperComponent', () => {
  let fixture: ComponentFixture<ModalWrapperComponent>;
  let component: ModalWrapperComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWrapperComponent]
    });
    fixture = TestBed.createComponent(ModalWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be created with title', () => {
    component.title = 'test title';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
