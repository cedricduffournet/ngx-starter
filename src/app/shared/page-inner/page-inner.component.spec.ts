import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { PageInnerComponent } from '@app/shared/page-inner/page-inner.component';

describe('PageInnerComponent', () => {
  let fixture: ComponentFixture<PageInnerComponent>;
  let component: PageInnerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageInnerComponent]
    });
    fixture = TestBed.createComponent(PageInnerComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be created with css class', () => {
    component.elemClass = 'test-class';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.test-class')).toBeTruthy();
  });
});
