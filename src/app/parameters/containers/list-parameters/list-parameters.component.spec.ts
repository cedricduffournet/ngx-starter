import { CommonModule } from '@angular/common';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { PageInnerModule } from '@app/shared/page-inner/page-inner.module';

import { ListParametersComponent } from '@app/parameters/containers';
import { ReferencedTableMenuComponent } from '@app/parameters/components';

describe('ParameterCivilityComponent', () => {
  let fixture: ComponentFixture<ListParametersComponent>;
  let component: ListParametersComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, PageInnerModule],
      declarations: [ListParametersComponent, ReferencedTableMenuComponent],
      providers: [provideMockStore()]
    });

    fixture = TestBed.createComponent(ListParametersComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
