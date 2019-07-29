import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared/shared.module';
import { CivilityEffects } from '@app/civility/state/effects';
import {
  CivilityAddComponent,
  CivilityUpdateComponent,
  CivilityDeleteComponent,
  CivilityFormComponent,
  CivilityItemComponent,
  CivilityItemsComponent
} from '@app/civility/components';
import {
  CivilityAddModalComponent,
  CivilityUpdateModalComponent,
  CivilityDeleteModalComponent,
  CivilityListViewComponent
} from '@app/civility/containers';
import { reducers } from '@app/civility/state/reducers';
import { CoalescingComponentFactoryResolver } from '@app/coalescing-component-factory-resolver.service';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    EffectsModule.forFeature([CivilityEffects]),
    StoreModule.forFeature('civilities', reducers)
  ],
  declarations: [
    CivilityListViewComponent,
    CivilityAddComponent,
    CivilityUpdateComponent,
    CivilityDeleteComponent,
    CivilityFormComponent,
    CivilityItemComponent,
    CivilityItemsComponent,
    CivilityAddModalComponent,
    CivilityUpdateModalComponent,
    CivilityDeleteModalComponent
  ],
  entryComponents: [
    CivilityUpdateModalComponent,
    CivilityAddModalComponent,
    CivilityDeleteModalComponent
  ],
  exports: [CivilityListViewComponent]
})
export class CivilityModule {
  // see https://github.com/angular/angular/issues/14324
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
