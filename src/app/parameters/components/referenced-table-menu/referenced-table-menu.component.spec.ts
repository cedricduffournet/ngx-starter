import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReferencedTableMenuComponent } from '@app/parameters/components';

describe('ParameterCivilityComponent', () => {
  let fixture: ComponentFixture<ReferencedTableMenuComponent>;
  let component: ReferencedTableMenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule],
      declarations: [ReferencedTableMenuComponent]
    });

    fixture = TestBed.createComponent(ReferencedTableMenuComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display civility menu', () => {
    component.canViewCivility = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
